import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxRadioGroupModule, DxTemplateModule, DxFormModule } from 'devextreme-angular';

import { FormComponent } from './form.component';
import { FormRoutingModule } from './form-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormRoutingModule,
    DxFormModule,
    DxRadioGroupModule,
    DxTemplateModule
  ],
  declarations: [FormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormModule { }
