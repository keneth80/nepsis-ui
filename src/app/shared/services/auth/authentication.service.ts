import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CatchAll} from '../../decorator/catch';
import {CommonsEndpointService} from '../../backend/api/commons-endpoint.service';
import {UserModel} from '../../models/user-model';
import {Router} from '@angular/router';

const tokenParse = (token: string): UserModel => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  const payload = JSON.parse(jsonPayload);
  const tempModel = JSON.parse(payload.sub);
  return {
    role: tempModel.role,
    userName: tempModel.username,
    name: tempModel.name
  } as UserModel;
}

@Injectable()
export class AuthenticationService {

  private TOKEN_NAME = 'jwt_token';

  // private REFRESH_TOKEN_NAME = 'refresh_token';

  private currentUserSubject: Subject<any>;

  private loginErrorSubject: Subject<any>;

  private jwtHelper: JwtHelperService = new JwtHelperService();

  private currentUserModel: UserModel | null = null;

  constructor(
    private endpoint: CommonsEndpointService,
    private router: Router
  ) {
      this.currentUserSubject = new Subject();
      this.loginErrorSubject = new Subject();
  }

  get user(): UserModel | null {
    return this.currentUserModel;
  }

  get $loginUser(): Observable<UserModel> {
      return this.currentUserSubject.asObservable();
  }

  get $loginError(): Observable<any> {
    return this.loginErrorSubject.asObservable();
  }

  get currentUserValue(): UserModel | null { // UserModel
      return this.getToken()? tokenParse(this.getToken()) : null;
  }

  get token(): string | null {
      return localStorage.getItem(this.TOKEN_NAME);
  }

  @CatchAll
  login(userId: string, password: string) {
    this.endpoint.login(userId, password)
        .subscribe(
            (token: string) => {
                this.setToken(token.replace('Bearer ', ''));
                this.currentUserModel = tokenParse(this.getToken());
                this.currentUserSubject.next(this.currentUserModel);
            },
            (error: any) => {
                if (console && console.log) {
                    console.log('login fail : ', error);
                }
                // TODO: login 완성 되면 복구
                this.loginErrorSubject.next(error);
            }
        );
  }

  logout() {
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

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME) || '';
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
    // return true;
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }
}
