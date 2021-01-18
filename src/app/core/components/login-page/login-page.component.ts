import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { GoToCreateAccount, GoToDashboard, RootState, UserLogged } from '@app/store';
import { ToastrService } from 'ngx-toastr';
import { RememberMeService } from '@app/core/services';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;
  public hide = true;
  public currentState = 'initial';
  public text = 'LOGIN';
  public rememberMeSelected = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<RootState>,
    private readonly authService: AuthService,
    private readonly rememberMeService: RememberMeService
  ) { }

  ngOnInit() {
    this.initForm();
    const remembereduserinfo = this.rememberMeService.get('rememberme');

    if (remembereduserinfo) {
      this.loginForm.get('emailId').setValue(remembereduserinfo.email);
      this.rememberMeSelected = true;
    }
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public rememberMe(selection: boolean) {
    this.rememberMeSelected = selection;
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.value.rememberme) {
      this.rememberMeService.set('rememberme', {
        email: this.loginForm.value.email,
      });
    } else {
      this.rememberMeService.remove('rememberme');
    }
    this.authService.login(this.loginForm.value).subscribe(
      (res: {username: string, token: string, roles: string[]}) => {
        this.store$.dispatch(new UserLogged([{
          email: res.username,
          token: res.token,
          roles: res.roles,
          logged: true
        }]));
        this.store$.dispatch(new GoToDashboard());
      }
    );
  }

  public goToCreateAccount(): void {
    this.store$.dispatch(new GoToCreateAccount());
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

}
