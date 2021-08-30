import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxListModule,
    DxPopupModule,
    DxRadioGroupModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxTextAreaModule,
    DxTextBoxModule
} from 'devextreme-angular';
import {Cm7710Component} from './cm7710.component';
import {Cm7710RoutingModule} from './cm7710-routing.module';
import {CommonCodeSelectBoxModule} from '../../../../shared/components/form/select-box/common-code-select-box.component';

@NgModule({
    imports: [
        CommonModule,
        Cm7710RoutingModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxFormModule,
        DxTextBoxModule,
        DxButtonModule,
        DxRadioGroupModule,
        DxDataGridModule,
        DxTemplateModule,
        DxPopupModule,
        DxListModule,
        CommonCodeSelectBoxModule
    ],
    declarations: [Cm7710Component],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class Cm7710Module {
}
