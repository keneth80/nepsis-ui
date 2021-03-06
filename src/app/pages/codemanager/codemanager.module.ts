import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxTextBoxModule,
  DxButtonModule,
  DxRadioGroupModule,
  DxDataGridModule,
  DxPopupModule,
  DxTemplateModule,
  DxListModule
} from 'devextreme-angular';
import { CodeManagerComponent } from './codemanager.component';
import { CodeManagerRoutingModule } from './codemanager-routing.module';
import { SelectBoxModule } from '../../shared/components/form/select-box/select-box.component';

@NgModule({
  imports: [
    CommonModule,
    CodeManagerRoutingModule,
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
    SelectBoxModule
  ],
  declarations: [CodeManagerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CodeManagerModule { }
