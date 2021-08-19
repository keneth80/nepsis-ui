import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpParams, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

/**
 * title: Mock data service
 * description: backend api 를 대신하여 mock data를 정의한다.
 */
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        // array in local storage for registered users
        // let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
 
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // common code test
            if (request.url.indexOf('commonCodeList') > -1 && request.method === 'GET') {
                // find if any user matches login credentials
              let body = [
                {
                  id: 'J0001',
                  label: 'Job1'
                },
                {
                  id: 'J0002',
                  label: 'Job2'
                },
                {
                  id: 'J0003',
                  label: 'Job3'
                }
              ];

              return of(new HttpResponse({ status: 200, body: body }));
            }
 
            // pass through any requests not handled above
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(300))
        .pipe(dematerialize());
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};