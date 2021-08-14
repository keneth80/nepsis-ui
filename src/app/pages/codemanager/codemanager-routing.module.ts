import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeManagerComponent } from './codemanager.component';

const routes: Routes = [
    {
        path: '',
        component: CodeManagerComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeManagerRoutingModule { }
