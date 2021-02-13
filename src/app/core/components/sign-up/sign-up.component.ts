import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';

import { RememberMeService } from '@app/core/services';
import { GoToLogin, RootState } from '@app/store';
import { Role, RoleType } from '@app/models/data.model';
import { AuthService } from '@app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { isCreateAdminAccount } from '@app/store/user-details/user-details.selectors';
import { GoToJobPosting, GoToJobPostingListing } from '@app/job-posting/job-posting-routing.actions';

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
  public isCreateAdminAccount: boolean;
  public roles: Role[] = [
    { roleId: RoleType.EMPLOYEE, name: RoleType.EMPLOYEE },
    { roleId: RoleType.EMPLOYER, name: RoleType.EMPLOYER },
  ];
  public rolesAdmin: Role[] = [
    { roleId: RoleType.ADMIN, name: RoleType.ADMIN }
  ];

  constructor(
    public readonly fb: FormBuilder,
    public readonly store$: Store<RootState>,
    private readonly authService: AuthService,
    private readonly rememberMeService: RememberMeService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.store$.select(isCreateAdminAccount).pipe(
      first(),
      tap(isAdminAccountCreation => {
        this.isCreateAdminAccount = isAdminAccountCreation;
        this.initForm();
      })
    ).subscribe();
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
    delete payload.firstName;
    delete payload.lastName;
    this.isFormSubmitted = true;
    const apiToHit = this.isCreateAdminAccount ? this.authService.createAdminAccount(payload) : this.authService.createAccount(payload);
    apiToHit.subscribe(
      (res) => {
        this.isFormSubmitted = false;
        this.isCreateAdminAccount ? this.toastrService.success('Admin created successfully') : this.toastrService.success(res.message);
        this.isCreateAdminAccount ? this.store$.dispatch(new GoToJobPostingListing()) : this.goToLogin();
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
      roles: [this.isCreateAdminAccount ? this.rolesAdmin[0].roleId.toUpperCase() : this.roles[0].roleId.toUpperCase(), Validators.required]
    });
  }

}
