import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first, shareReplay } from 'rxjs/operators';
import { Subject, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalVariableService } from '../app/global-variable.service';
import { CatchAll } from '../../decorator/catch';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private PRE_FIX: string = '';

  private TOKEN_NAME = 'jwt_token';

  private REFRESH_TOKEN_NAME = 'refresh_token';

  private currentUserSubject: Subject<any>;

  private jwtHelper: JwtHelperService = new JwtHelperService();

  private currentUserModel: any;

  constructor(
    private http: HttpClient,
    private globalService: GlobalVariableService
  ) {
      this.currentUserSubject = new Subject();
  }

  get loginUser$(): Observable<any> {
      return this.currentUserSubject.asObservable();
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
    // this.samplApiService.login(userId, password)
    //     .subscribe(
    //         (data: UserModel) => {
    //             this.setToken(data.token);
    //             this.setRefreshToken(data.refreshToken);
    //             sessionStorage.setItem('workHistory', '');
    //             this.currentUserSubject.next(data);
    //         },
    //         (error) => {
    //             if (console && console.log) {
    //                 console.log('login fail : ', error);
    //             }
    //             this.currentUserSubject.next(null);
    //         }
    //     );
  }

  logout() {
    // remove user from local storage to log user out
    this.removeToken();
    this.currentUserSubject.next(null);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  setRefreshToken(refreshToken: string): void {
      localStorage.setItem(this.REFRESH_TOKEN_NAME, refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_NAME);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  // 토큰 유효성 검증
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }
}
