import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
// import { ProfileComponent } from './pages/profile/profile.component';
// import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { AuthGuard } from './shared/gaurd/auth.gaurd';

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
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  //   canActivate: [ AuthGuardService ]
  // },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuard ]
  },
  // {
  //   path: 'reset-password',
  //   component: ResetPasswordFormComponent,
  //   canActivate: [ AuthGuard ]
  // },
  // {
  //   path: 'create-account',
  //   component: CreateAccountFormComponent,
  //   canActivate: [ AuthGuard ]
  // },
  // {
  //   path: 'change-password/:recoveryCode',
  //   component: ChangePasswordFormComponent,
  //   canActivate: [ AuthGuard ]
  // },
  // user 작성 페이지
  {
    path: 'grid',
    loadChildren: () => import('./pages/grid/grid.module').then(m => m.GridModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'codemanager',
    loadChildren: () => import('./pages/codemanager/codemanager.module').then(m => m.CodeManagerModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule),
    canActivate: [ AuthGuard ]
  },
{
    path: 'button',
    loadChildren: () => import('./pages/button/button.module').then(m => m.ButtonModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'table-grid',
    loadChildren: () => import('./pages/table/table-grid.module').then(m => m.TableGridModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: 'codemanager'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
