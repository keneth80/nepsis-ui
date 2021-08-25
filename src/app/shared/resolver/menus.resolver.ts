import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { EndpointService } from '../backend/api/endpoint.service';
import { GlobalVariableService } from '../services/app/global-variable.service';
import { SideNavigationMenuService } from '../components/side-navigation-menu/side-navigation-menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuResolver implements Resolve<Promise<any>> {
  constructor(
    private globalVariable: GlobalVariableService,
    private menuService: SideNavigationMenuService
  ) {}

  resolve() {
    return new Promise((resolve, reject) => {
      console.log('menu start');
      if (this.globalVariable.menuList.length) {
        console.log('menu is');
        resolve(this.globalVariable.menuList);
      } else {
        const subscription = this.menuService.$menuList.subscribe((menus: any[]) => {
          console.log('menu get');
          this.globalVariable.menuList = menus;
          subscription.unsubscribe();
          resolve(this.globalVariable.menuList);
        });
        this.menuService.retrieveMenuList();
      }
    });
  }
}