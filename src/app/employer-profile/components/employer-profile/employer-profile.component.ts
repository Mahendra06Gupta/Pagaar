import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RootState } from '@app/store';
import { getUserLoggedInEmail } from '@app/store/user-details/user-details.selectors';
import { EmployerApiService } from '@app/employer-profile/services/employer-api.service';
import { GoToJobPosting } from '@app/job-posting/job-posting-routing.actions';
import { EmployersDetail } from '@app/employer-profile/models/employer-detail.model';
import { DialogService } from '@app/core/services';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss'],
})
export class EmployerProfileComponent implements OnInit {

  public inputArgs: EmployersDetail;
  public detailForm: FormGroup;
  public userLoggedEmailId: string;
  public isFormSubmitted = false;
  public businessName = [
    {value: 'EXTRACTIVE_INDUSTRY', label: 'Extractive Industry'},
    {value: 'GENETIC_INDUSTRY', label: 'Genetic Industry'},
    {value: 'CONSTRUCTIVE_INDUSTRY', label: 'Constructive Industry'},
    {value: 'SERVICE_INDUSTRY', label: 'Service Industry'},
    {value: 'TRADE', label: 'Trade'},
    {value: 'TRANSPORT', label: 'Transport'},
    {value: 'INSURANCE', label: 'Insurance'},
    {value: 'WAREHOUSING', label: 'Ware House'},
    {value: 'BANKING', label: 'Banking'},
    {value: 'ADVERTISING', label: 'Advertising'}
  ];

  public step = 0;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<RootState>,
    private readonly employerApiService: EmployerApiService,
    private readonly toastrService: ToastrService,
    private readonly dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    if (!this?.inputArgs?.id) {
      this.store$.select(getUserLoggedInEmail).pipe(
        tap((email) => {
          this.userLoggedEmailId = email,
          this.initForm();
        })
      ).subscribe();
    } else {
      this.initForm();
    }
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.detailForm.controls[controlName].hasError(errorName);
  }

  public setStep(index: number): void {
    this.step = index;
  }

  public nextStep(): void {
    this.step++;
  }

  public prevStep(): void {
    this.step--;
  }

  public onSubmit(): void {
    if (this.detailForm.invalid) {
      return;
    } else {
      if (this.detailForm.value) {
        const payload = {
          ...this.detailForm.value,
          ...this.inputArgs?.id && {id: this.inputArgs.id}
        };
        const apiToHit = this?.inputArgs ? this.employerApiService.updateEmployerById(payload) : this.employerApiService.addEmployerDetail(payload);
        apiToHit.pipe(
          tap(res => {
            this?.inputArgs ? this.toastrService.success('Detail Updated Successfully') : this.toastrService.success('Detail Added Successfully');
            if (this?.inputArgs) {
              this.dialogService.closeAllDialogs();
            } else {
              this.store$.dispatch(new GoToJobPosting());
            }
          }, () => this.isFormSubmitted = false)
        ).subscribe();
      }
    }
  }

  public get f() { return this.detailForm.controls; }

  private initForm(): void {
    this.detailForm = this.fb.group({
      email: [this?.inputArgs?.email ? this?.inputArgs?.email : this.userLoggedEmailId, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      phoneNumber: [this?.inputArgs?.phoneNumber ? this?.inputArgs?.phoneNumber : '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      country: [this?.inputArgs?.country ? this?.inputArgs?.country : '', [Validators.required, Validators.maxLength(32)]],
      pincode: [this?.inputArgs?.pincode ? this?.inputArgs?.pincode : '', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      companyName: [this?.inputArgs?.companyName ? this?.inputArgs?.companyName : '', [Validators.required, Validators.maxLength(32)]],
      companySize: [this?.inputArgs?.companySize ? this?.inputArgs?.companySize : '', [Validators.required, Validators.maxLength(32)]],
      businessNature: [this?.inputArgs?.businessNature ? this?.inputArgs?.businessNature : '', [Validators.required]],
    });
  }

}
