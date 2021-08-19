import { Component, HostBinding, OnInit } from '@angular/core';
import { ScreenService, AppInfoService } from './shared/services';
import { AuthenticationService } from './shared/services/auth/authentication.service';
import { UserModel } from './shared/models/user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isUser = false;
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(
    private authentication: AuthenticationService,
    private screen: ScreenService,
    private router: Router,
    public appInfo: AppInfoService
  ) {
    console.log('App : ', this.authentication.currentUserValue);
  }

  ngOnInit() {
    this.authentication.loginUser$.subscribe((user: UserModel) => {
      if (user) {
        this.isUser = true;
        // this.router.navigate(['codemanager']);
      } else {
        this.isUser = false;
      }
    });

    // TODO: token 체크
    if (!this.authentication.isAuthenticated()) {
      this.isUser = false;
      this.router.navigate(['login-form']);
    } else {
      this.isUser = true;
    }
  }
}
