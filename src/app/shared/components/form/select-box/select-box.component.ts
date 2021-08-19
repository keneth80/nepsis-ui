import { NgModule, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule } from 'devextreme-angular';

import { ListCode } from '../../../models/common-code';
import { BaseComponent } from '../../base.component';
import { SelectBoxService } from './select-box.service';

@Component({
  selector: 'form-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  providers: [
    SelectBoxService
  ]
})
export class SelectBoxComponent extends BaseComponent implements OnInit {
  @Input()
  commonCodeType: string = '';

  @Input()
  codeValue: string = '';

  @Output()
  onChangeValue: EventEmitter<ListCode> = new EventEmitter();

  codeList: ListCode[] = [];

  constructor(
    private selectboxService: SelectBoxService
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectboxService.$codeList.subscribe((result: ListCode[]) => {
      this.codeList = result;
    });

    this.selectboxService.retrieveCommonCodeList(this.commonCodeType);
  }

  onSelectionChanged({ selectedItem }: any) {
    this.onChangeValue.emit(selectedItem);
    console.log('onSelectionChanged : ', selectedItem);
  }

}

@NgModule({
  imports: [
    CommonModule,
    DxSelectBoxModule
  ],
  declarations: [ SelectBoxComponent ],
  exports: [ SelectBoxComponent ]
})
export class SelectBoxModule { }