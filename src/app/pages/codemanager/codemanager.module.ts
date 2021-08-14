import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxTextBoxModule,
  DxButtonModule,
  DxRadioGroupModule
} from 'devextreme-angular';
import { CodeManagerComponent } from './codemanager.component';
import { CodeManagerRoutingModule } from './codemanager-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CodeManagerRoutingModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxTextBoxModule,
    DxButtonModule,
    DxRadioGroupModule
  ],
  declarations: [CodeManagerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CodeManagerModule { }
