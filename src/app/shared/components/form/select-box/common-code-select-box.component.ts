import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DxSelectBoxModule} from 'devextreme-angular';

import {ListCode} from '../../../models/common-code';
import {BaseComponent} from '../../base.component';
import {CommonCodeSelectBoxService} from './common-code-select-box.service';
import {GlobalVariableService} from '../../../services/app/global-variable.service';

@Component({
    selector: 'common-code-select-box',
    templateUrl: './common-code-select-box.component.html',
    styleUrls: ['./common-code-select-box.component.scss'],
    providers: [
        CommonCodeSelectBoxService
    ]
})
export class CommonCodeSelectBoxComponent extends BaseComponent implements OnInit {

    @Input()
    readOnly: boolean = false;

    @Input()
    items: ListCode[] = [];

    @Input()
    isGlobalValue: boolean = true;

    @Input()
    commonCodeType: string = '';

    @Input()
    codeValue: string = '';

    @Output()
    onChangeValue: EventEmitter<ListCode> = new EventEmitter();

    codeList: ListCode[] = [];

    constructor(
        private globalVariableService: GlobalVariableService,
        private selectboxService: CommonCodeSelectBoxService
    ) {
        super();
    }

    ngOnInit(): void {
        // 초기에 불러온 공통코드 사용여부
        // if (this.isGlobalValue) {
        //   this.codeList = this.globalVariableService.commonCode[this.commonCodeType];
        // } else {
        //   this.selectboxService.$codeList.subscribe((result: ListCode[]) => {
        //     this.codeList = result;
        //   });

        //   this.selectboxService.retrieveCommonCodeList(this.commonCodeType);
        // }
    }

    onSelectionChanged({selectedItem}: any) {
        // console.log('onSelectionChanged : ', selectedItem);
        if (selectedItem) this.onChangeValue.emit(selectedItem);
    }

}

@NgModule({
    imports: [
        CommonModule,
        DxSelectBoxModule
    ],
    declarations: [CommonCodeSelectBoxComponent],
    exports: [CommonCodeSelectBoxComponent]
})
export class CommonCodeSelectBoxModule {
}
