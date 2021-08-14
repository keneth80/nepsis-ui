import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
// import { ProfileComponent } from './pages/profile/profile.component';
// import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

const routes: Routes = [
  // {
  //   path: 'tasks',
  //   component: TasksComponent,
  //   canActivate: [ AuthGuardService ]
  // },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [ AuthGuardService ]
  // },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  // user 작성 페이지
  {
    path: 'grid',
    loadChildren: () => import('./pages/grid/grid.module').then(m => m.GridModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'codemanager',
    loadChildren: () => import('./pages/codemanager/codemanager.module').then(m => m.CodeManagerModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule),
    canActivate: [ AuthGuardService ]
  },
{
    path: 'button',
    loadChildren: () => import('./pages/button/button.module').then(m => m.ButtonModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'table-grid',
    loadChildren: () => import('./pages/table/table-grid.module').then(m => m.TableGridModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
