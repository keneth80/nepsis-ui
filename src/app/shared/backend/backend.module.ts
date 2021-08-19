import { NgModule } from '@angular/core';
import { fakeBackendProvider } from './iterceptors/fake-backend-interceptor';
import { EndpointService } from './api/endpoint.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './iterceptors/jwt-interceptor';
import { ErrorInterceptor } from './iterceptors/error-interceptor';

@NgModule({
  providers: [
    fakeBackendProvider,
    EndpointService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class BackendModule { }
