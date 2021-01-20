import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { RememberMeService } from '@app/core/services';
import { GoToLogin, RootState } from '@app/store';
import { Role, RoleType } from '@app/models/data.model';
import { AuthService } from '@app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;
  public hide = true;
  public rememberMeSelected = true;
  public isFormSubmitted = false;
  public roles: Role[] = [
    { roleId: RoleType.EMPLOYEE, name: RoleType.EMPLOYEE },
    { roleId: RoleType.EMPLOYER, name: RoleType.EMPLOYER }
  ];

  constructor(
    public readonly fb: FormBuilder,
    public readonly store$: Store<RootState>,
    private readonly authService: AuthService,
    private readonly rememberMeService: RememberMeService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
    const remembereduserinfo = this.rememberMeService.get('rememberme');

    if (remembereduserinfo) {
      this.signUpForm.get('emailId').setValue(remembereduserinfo.email);
      this.rememberMeSelected = true;
    }
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.signUpForm.controls[controlName].hasError(errorName);
  }

  public rememberMe(selection: boolean) {
    this.rememberMeSelected = selection;
  }

  public onSubmit(): void {
    if (this.signUpForm.invalid) {
      return;
    }
    if (this.signUpForm.value.rememberme) {
      this.rememberMeService.set('rememberme', {
        email: this.signUpForm.value.email,
      });
    } else {
      this.rememberMeService.remove('rememberme');
    }
    const payload = {
      ...this.signUpForm.value,
      name: `${this.signUpForm.value.firstName} ${this.signUpForm.value.lastName}`,
      roles: [this.signUpForm.value.roles]
    };
    delete payload.lastName;
    this.isFormSubmitted = true;
    this.authService.createAccount(payload).subscribe(
      (res) => {
        this.isFormSubmitted = false;
        this.toastrService.success(res.message);
        this.goToLogin();
      }, () => this.isFormSubmitted = false
    );
  }

  public goToLogin(): void {
    this.store$.dispatch(new GoToLogin());
  }

  private initForm(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.() ]{3,50}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.() ]{3,50}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      roles: ['', Validators.required]
    });
  }

}
