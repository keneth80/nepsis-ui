import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EndpointService } from '../backend/api/endpoint.service';
import { ApplicationInitializeService } from './app/application-initialize.service';
import { GlobalVariableService } from './app/global-variable.service';
import { ErrorInterceptor } from '../backend/iterceptors/error-interceptor';
import { JwtInterceptor } from '../backend/iterceptors/jwt-interceptor';
import { GlobalErrorHandler } from './error/global-error-handler';
import { mergeMap } from 'rxjs/operators';

export function retriveConfiguration(globalService: GlobalVariableService, endpoint: EndpointService) {
  return () => globalService.retriveConfiguration();
  // .pipe(
  //   mergeMap((res: any) => {
  //       globalService.remoteUrl = res.remote;
  //       return endpoint.retrieveCommonCodeList('JOB_ST_CD');
  //   })
  // ).toPromise();
}

export function init(appInitService: ApplicationInitializeService) {
  return () => appInitService.load();
}

@NgModule({
  providers: [
    EndpointService,
    GlobalVariableService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: APP_INITIALIZER, useFactory: retriveConfiguration, deps: [GlobalVariableService, EndpointService], multi: true },
    { provide: APP_INITIALIZER, useFactory: init, deps: [ApplicationInitializeService], multi: true }
  ]
})
export class ServiceModule { }
