import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableGridComponent } from './table-grid.component';
import { TableGridRoutingModule } from './table-grid-routing.module';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    TableGridRoutingModule,
    DxDataGridModule
  ],
  declarations: [TableGridComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class TableGridModule { }
