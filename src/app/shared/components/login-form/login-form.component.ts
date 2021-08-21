import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { BaseComponent } from '../base.component';
import { UserModel } from '../../models/user-model';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends BaseComponent implements OnInit {
  loading = false;
  formData: any = {};

  private returnUrl = '/codemanager';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/codemanager']);
      return;
    }

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/codemanager';

    this.subscription = this.authenticationService.loginUser$
      .subscribe((user: UserModel) => {
        this.loading = false;
        if (user) {
          this.router.navigate(['/codemanager']);
        }
      });

    this.subscription = this.authenticationService.loginError$
      .subscribe((error: any) => {
        this.loading = false;
        this.formData.password = '';
        notify(error.message, 'error', 2000);
      });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const { userName, password } = this.formData;
    this.loading = true;
    this.authenticationService.login(userName, password);
  }

}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ LoginFormComponent ],
  exports: [ LoginFormComponent ]
})
export class LoginFormModule { }
