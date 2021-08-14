import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ButtonRoutingModule } from './button-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonRoutingModule
  ],
  declarations: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonModule { }
