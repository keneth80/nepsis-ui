import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Cm7710Component} from './cm7710.component';

const routes: Routes = [
    {
        path: '',
        component: Cm7710Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Cm7710RoutingModule {
}
