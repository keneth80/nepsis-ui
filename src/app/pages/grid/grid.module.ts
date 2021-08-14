import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridComponent } from './grid.component';
import { GridRoutingModule } from './grid-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GridRoutingModule
  ],
  declarations: [GridComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GridModule { }
