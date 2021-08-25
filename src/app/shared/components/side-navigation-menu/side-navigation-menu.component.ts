import { Component, NgModule, Output, Input, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { navigation } from '../../../app-navigation';

import * as events from 'devextreme/events';
import { SideNavigationMenuService } from './side-navigation-menu.service';
import { GlobalVariableService } from '../../services/app/global-variable.service';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss'],
})
export class SideNavigationMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu!: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<ItemClickEvent>();

  @Output()
  openMenu = new EventEmitter<any>();

  private _selectedItem!: String;
  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  private _items!: Record <string, any>[];
  get items() {
    if (!this._items) {
      this._items = navigation.map((item) => {
        if(item.path && !(/^\//.test(item.path))){
          item.path = `/${item.path}`;
        }
         return { ...item, expanded: !this._compactMode }
        });
    }

    return this._items;
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  constructor(
    private elementRef: ElementRef,
    private globalVariable: GlobalVariableService,
    private menuService: SideNavigationMenuService
  ) { }

  onItemClick(event: ItemClickEvent) {
    this.selectedItemChanged.emit(event);
  }

  ngOnInit() {
    console.log('menu create : ', this.globalVariable.menuList);
    this.menuService.$menuList.subscribe((menuList: any[]) => {
      console.log('menuList : ', menuList);
    });

    // this.menuService.retrieveMenuList();
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.next(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}

@NgModule({
  imports: [ DxTreeViewModule ],
  declarations: [ SideNavigationMenuComponent ],
  exports: [ SideNavigationMenuComponent ]
})
export class SideNavigationMenuModule { }
