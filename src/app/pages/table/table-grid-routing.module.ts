import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableGridComponent } from './table-grid.component';

const routes: Routes = [
    {
        path: '',
        component: TableGridComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableGridRoutingModule { }
