import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { ScreenService, AppInfoService, AuthGuardService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from './shared/services/service.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/gaurd/auth.gaurd';
import { AuthenticationService } from './shared/services/auth/authentication.service';
import { APP_BASE_HREF } from '@angular/common';
import { BackendModule } from './shared/backend/backend.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    ServiceModule,
    BackendModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    ScreenService,
    AppInfoService,
    {provide: APP_BASE_HREF, useValue: '/views'}
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
