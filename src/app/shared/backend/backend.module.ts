import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './iterceptors/jwt-interceptor';
import {ErrorInterceptor} from './iterceptors/error-interceptor';

@NgModule({
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ]
})
export class BackendModule {
}
