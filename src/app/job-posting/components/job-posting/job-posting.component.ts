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
import { fromEmployerSelector } from '@app/store/store';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';

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

  public jobPostingForm: FormGroup;
  public employerId: string;
  public dateTo: moment.Moment = moment();
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public jobNature = [
    {value: 'FULL_TIME', label: 'Full time'},
    {value: 'PART_TIMR', label: 'Part time'},
    {value: 'REMOTE', label: 'Remote'}
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<RootState>,
    private readonly jobPostingApiService: JobPostingApiService,
    private readonly toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.store$.select(fromEmployerSelector.getEmployerIds).pipe(
      tap((id) => {
        this.employerId = id.toString(),
        this.initForm();
      })
    ).subscribe();
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
          }
        };
        delete payload.employerId;
        delete payload.starting;
        delete payload.upto;
        delete payload.exact;
        delete payload.currency;
        this.jobPostingApiService.addJobDetail(payload).pipe(
          tap(res => {
            this.toastrService.success('Job Detail Added Successfully');
          })
        ).subscribe();
      }
    }
  }

  public onFromDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.jobPostingForm.get('applicationDeadline').setValue(event.value);
  }

  public checkbox(value: string, event: MatCheckboxChange) {
    if (value === 'YES') {
      this.jobPostingForm.get('resumeRequired').setValue(true);
    } else if (value === 'NO') {
      this.jobPostingForm.get('resumeRequired').setValue(false);
    }

    if (value === 'YES' && event.checked) {
      this.disabledNoCheckbox = true;
    } else if (value === 'YES' && !event.checked) {
      this.disabledNoCheckbox = false;
    }

    if (value === 'NO' && event.checked) {
      this.disabledYesCheckbox = true;
    } else if (value === 'NO' && !event.checked) {
      this.disabledYesCheckbox = false;
    }
  }

  public get f() { return this.jobPostingForm.controls; }

  private initForm(): void {
    this.jobPostingForm = this.fb.group({
      employerId: [this.employerId, [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(32)]],
      nature: ['', [Validators.required]],
      totalHiring: ['', [Validators.required, Validators.pattern('^[0-9]{1,6}$')]],
      shift: ['', [Validators.required, Validators.maxLength(32)]],
      type: ['', [Validators.required]],
      starting: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      upto: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      exact: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      currency: ['INR', [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      benefits: ['', [Validators.required]],
      resumeRequired: ['', [Validators.required]],
      applicationDeadline: ['', [Validators.required]],
      interviewType: ['', [Validators.required, Validators.maxLength(32)]],
      location: ['', [Validators.required, Validators.maxLength(32)]],
    });
  }

}
