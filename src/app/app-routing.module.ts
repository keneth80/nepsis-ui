import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from './shared/components';
import {AuthGuard} from './shared/gaurd/auth.gaurd';

const routes: Routes = [
  {
    path: 'login-form',
    component: LoginFormComponent
  },
  {
    path: 'cm7710',
    loadChildren: () => import('./pages/cm/cmn/cm7710/cm7710.module').then(m => m.Cm7710Module),
    canActivate: [ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: 'login-form'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
