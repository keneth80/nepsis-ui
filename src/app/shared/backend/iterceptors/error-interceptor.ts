import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { AuthenticationService } from '../../service/auth/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    // private authenticationService: AuthenticationService
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
              error.message = 'Please Login!';

              // auto logout if 401 response returned from api
              // this.authenticationService.logout();
          }

          return throwError(error);
    }));
  }
}
