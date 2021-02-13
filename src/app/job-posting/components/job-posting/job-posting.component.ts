import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { RootState } from '@app/store';
import { DateFormats } from '@app/shared/models/date-format/date-formats';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';
import { Observable } from 'rxjs';
import { EmployersDetail } from '@app/employer-profile/models/employer-detail.model';
import { getEmployerEntities } from '@app/store/employer-store/employer.selectors';
import { Jobs } from '@app/dashboard/store/models/dashboard-state.model';
import { DialogService } from '@app/core/services';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats },
  ]
})
export class JobPostingComponent implements OnInit {
  public inputArgs: Jobs;
  public jobPostingForm: FormGroup;
  public isFormSubmitted = false;
  public employerId: string;
  public dateTo: moment.Moment = moment();
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public employerDetails$: Observable<EmployersDetail[]> = this.store$.select(getEmployerEntities);
  public jobNature = [
    {value: 'FULL_TIME', label: 'Full time'},
    {value: 'PART_TIME', label: 'Part time'}
  ];
  public jobType = [
    {value: 'PERMANENT', label: 'Permanent'},
    {value: 'CONTRACTUAL', label: 'Contractual'},
    {value: 'INTERNSHIP', label: 'Internship'},
    {value: 'COMISSION', label: 'Comission'}
  ];
  public jobShift = [
    {value: 'MORNING', label: 'Morning'},
    {value: 'EVENING', label: 'Evening'},
    {value: 'ROTATIONAL', label: 'Rotational'},
  ];
  public benefits = [
    {value: 'WORK_FROM_HOME', label: 'Work from home'},
    {value: 'CELL_PHONE_BILL', label: 'Cell phone bill'},
    {value: 'FLEXIBLE_WORKING_HOUR', label: 'Flexible working hour'},
    {value: 'MEAL_ALLOWANCE', label: 'Meal allowance'},
    {value: 'HEALTH_INSURANCE', label: 'Health insurance'},
    {value: 'INTERNET_SERVICE', label: 'Internet service'},
    {value: 'PAID_LEAVES', label: 'Paid leaves'},
    {value: 'LIFE_INSURANCE', label: 'Life insurance'},
    {value: 'ACCOMODATION', label: 'Accomodation'},
    {value: 'TRAVELLING_ALLOWANCE', label: 'Travelling allowance'},
    {value: 'NONE', label: 'None'}
  ];
  public jobInterviewType = [
    {value: 'WALKIN', label: 'walk-in'},
    {value: 'SCHEDULED', label: 'Scheduled'}
  ];
  public disabledNoCheckbox = false;
  public disabledYesCheckbox = false;
  public yesChecked = false;
  public noChecked = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<RootState>,
    private readonly jobPostingApiService: JobPostingApiService,
    private readonly toastrService: ToastrService,
    private readonly dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.initForm();
    if (this.inputArgs) {
      this.checkbox(this?.inputArgs?.resumeRequired ? 'YES' : 'NO');
      if (this?.inputArgs?.resumeRequired) {
        this.yesChecked = true;
      } else {
        this.noChecked = true;
      }
    }
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.jobPostingForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(): void {
    if (this.jobPostingForm.invalid) {
      return;
    } else {
      if (this.jobPostingForm.value) {
        const payload = {
          ...this.jobPostingForm.value,
          totalHiring: +this.jobPostingForm.value.totalHiring,
          applicationDeadline: moment(this.jobPostingForm.value.applicationDeadline).format('DD/MM/YYYY'),
          employer: {
            employerId: this.jobPostingForm.value.employerId
          },
          salary: {
            starting: +this.jobPostingForm.value.starting,
            upto: +this.jobPostingForm.value.upto,
            exact: +this.jobPostingForm.value.exact,
            currency: this.jobPostingForm.value.currency
          },
          ...this.inputArgs?.id && {id: this.inputArgs.id}
        };
        delete payload.employerId;
        delete payload.starting;
        delete payload.upto;
        delete payload.exact;
        delete payload.currency;
        this.isFormSubmitted = true;
        const apiToHit = this?.inputArgs ? this.jobPostingApiService.updateJobDetail(payload) : this.jobPostingApiService.addJobDetail(payload);
        apiToHit.pipe(
          tap(res => {
            this.isFormSubmitted = false;
            this?.inputArgs ? this.toastrService.success('Job Detail Updated Successfully') : this.toastrService.success('Job Detail Added Successfully');
            if (this?.inputArgs) {
              this.dialogService.closeAllDialogs();
            }
          }, () => this.isFormSubmitted = false),
        ).subscribe();
      }
    }
  }

  public onFromDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.jobPostingForm.get('applicationDeadline').setValue(event.value);
  }

  public checkbox(value: string, event?: MatCheckboxChange) {
    if (value === 'YES') {
      this.yesChecked = true;
      this.noChecked = false;
      this.jobPostingForm.get('resumeRequired').setValue(true);
    } else if (value === 'NO') {
      this.yesChecked = false;
      this.noChecked = true;
      this.jobPostingForm.get('resumeRequired').setValue(false);
    }
  }

  public get f() { return this.jobPostingForm.controls; }

  private initForm(): void {
    this.jobPostingForm = this.fb.group({
      employerId: [this.inputArgs?.employer?.employerId ? this.inputArgs.employer.employerId : '', [Validators.required]],
      title: [this?.inputArgs?.title ? this.inputArgs.title : '', [Validators.required, Validators.maxLength(32)]],
      nature: [this?.inputArgs?.nature ? this.inputArgs.nature : '', [Validators.required]],
      totalHiring: [this?.inputArgs?.totalHiring ? this.inputArgs.totalHiring : '', [Validators.required, Validators.pattern('^[0-9]{1,6}$')]],
      shift: [this?.inputArgs?.shift ? this.inputArgs.shift : '', [Validators.required, Validators.maxLength(32)]],
      type: [this?.inputArgs?.type ? this.inputArgs.type : '', [Validators.required]],
      starting: [this?.inputArgs?.salary?.starting ? this.inputArgs.salary.starting : '', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      upto: [this?.inputArgs?.salary?.upto ? this.inputArgs.salary.upto : '', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      exact: [this?.inputArgs?.salary?.exact ? this.inputArgs.salary.exact : '', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      currency: [this?.inputArgs?.salary?.currency ? this.inputArgs.salary.currency : 'INR', [Validators.required, Validators.maxLength(32)]],
      description: [this?.inputArgs?.description ? this.inputArgs.description : '', [Validators.required, Validators.maxLength(1000)]],
      benefits: [this?.inputArgs?.benefits ? this.inputArgs.benefits : '', [Validators.required]],
      resumeRequired: ['', [Validators.required]],
      applicationDeadline: [this?.inputArgs?.applicationDeadline ? moment(this?.inputArgs?.applicationDeadline, 'DD/MM/YYYY') : '', [Validators.required]],
      interviewType: [this?.inputArgs?.interviewType ? this.inputArgs.interviewType : '', [Validators.required, Validators.maxLength(32)]],
      location: [this?.inputArgs?.location ? this.inputArgs.location : '', [Validators.required, Validators.maxLength(32)]],
    });
  }

}
