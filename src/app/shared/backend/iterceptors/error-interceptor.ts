import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../../services/auth/authentication.service';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private route: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError(err => {
          const error: any = {
              status: err.status,
              name: err.name ? err.name : 'Error',
              message: err.message ? err.message : 'Unknown Error'
          };

          if (err.status === 0) {
              error.name = 'Network Error';
              error.message = 'Please check the Server or your Network environment';
          } else if (err.status === 401) {
              error.status = 401;
              error.name = 'UNAUTHORIZED';
              console.log('this.route.url : ', this.route.url);
              if (this.route.url === '/login-form') {
                error.message = 'Please check your ID or password.';
              } else {
                error.message = 'not authorization, please login!';
                // auto logout if 401 response returned from api
                notify({
                  message: '로그인해주세요.',
                  position: {
                      my: 'center top',
                      at: 'center top'
                  }
                }, 'error', 2000);
                this.authenticationService.logout();
              }
          }

          return throwError(error);
    }));
  }
}
