import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { BaseComponent } from '../base.component';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent extends BaseComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: UserModel | null = { userName: '', token: '' };

  // userMenuItems = [
  //   {
  //     text: 'Profile',
  //     icon: 'user',
  //     onClick: () => {
  //       this.router.navigate(['/profile']);
  //     }
  //   },
  //   {
  //     text: 'Logout',
  //     icon: 'runner',
  //     onClick: () => {
  //       this.authService.logOut();
  //     }
  //   }
  // ];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.user = this.authService.user;
    this.subscription = this.authService.loginUser$.subscribe((user: UserModel) => {
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['login-form']);
      }
    });
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  onLogoutHandler(event: any) {
    this.authService.logout();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
