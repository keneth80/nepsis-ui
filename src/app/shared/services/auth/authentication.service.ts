import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first, shareReplay } from 'rxjs/operators';
import { Subject, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalVariableService } from '../app/global-variable.service';
import { CatchAll } from '../../decorator/catch';
import { EndpointService } from '../../backend/api/endpoint.service';
import { UserModel } from '../../models/user-model';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private PRE_FIX: string = '';

  private TOKEN_NAME = 'jwt_token';

  // private REFRESH_TOKEN_NAME = 'refresh_token';

  private currentUserSubject: Subject<any>;

  private loginErrorSubject: Subject<any>;

  private jwtHelper: JwtHelperService = new JwtHelperService();

  private currentUserModel: UserModel | null = null;

  constructor(
    private endpoint: EndpointService,
    private router: Router,
    private globalService: GlobalVariableService
  ) {
      this.currentUserSubject = new Subject();
      this.loginErrorSubject = new Subject();
  }

  get user(): UserModel | null {
    return this.currentUserModel;
  }

  get loginUser$(): Observable<UserModel> {
      return this.currentUserSubject.asObservable();
  }

  get loginError$(): Observable<any> {
    return this.loginErrorSubject.asObservable();
  }

  get currentUserValue(): any { // UserModel
      // TODO: login 시 token user data도 포함 시킬지 문의
      const decodeObject: any = this.jwtHelper.decodeToken(this.getToken() || '');
      return null;
      // return <UserModel>JSON.parse(localStorage.getItem('currentUser'));
  }

  get token(): string | null {
      return localStorage.getItem(this.TOKEN_NAME);
  }

  @CatchAll
  login(userId: string, password: string) {
    this.endpoint.login(userId, password)
        .subscribe(
            (data: UserModel) => {
                this.setToken(data.token || '');
                // this.setRefreshToken(data.refreshToken);
                this.currentUserModel = data;
                this.currentUserSubject.next(data);
            },
            (error: any) => {
                if (console && console.log) {
                    console.log('login fail : ', error);
                }
                // TODO: login 완성 되면 복구
                // this.loginErrorSubject.next(error);
                this.currentUserModel = {
                  userName: 'admin',
                  token: 'token'
                };
                this.currentUserSubject.next({
                  userName: 'admin',
                  token: 'token'
                });
            }
        );
  }

  async logout() {
    // remove user from local storage to log user out
    this.removeToken();
    this.currentUserModel = null;
    this.currentUserSubject.next(this.currentUserModel);
    this.router.navigate(['/login-form']);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  // setRefreshToken(refreshToken: string): void {
  //     localStorage.setItem(this.REFRESH_TOKEN_NAME, refreshToken);
  // }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  // getRefreshToken(): string | null {
  //   return localStorage.getItem(this.REFRESH_TOKEN_NAME);
  // }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  // 토큰 유효성 검증
  isAuthenticated(): boolean {
    return true;
    // const token = this.getToken();
    // return token ? !this.isTokenExpired(token) : false;
  }
}
