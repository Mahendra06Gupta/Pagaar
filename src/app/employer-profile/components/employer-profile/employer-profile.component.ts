import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatChipList } from '@angular/material/chips';

import { GoToDashboard, RootState } from '@app/store';
import { getUserLoggedInEmail } from '@app/store/user-details/user-details.selectors';
import { DateFormats } from '@app/shared/models/date-format/date-formats';
import { EmployerApiService } from '@app/employer-profile/services/employer-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats },
  ]
})
export class EmployerProfileComponent implements OnInit {

  @ViewChild('skillList', { static: true })
  public skillList: MatChipList;
  @ViewChild('hobbiesList', { static: true })
  public hobbiesList: MatChipList;

  public detailForm: FormGroup;
  public userLoggedEmailId: string;
  public dateTo: moment.Moment = moment().subtract(18, 'years');
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
  public idProofUploadFile: any;
  public idProofUploadFileSuccessfully: boolean;
  public qualificationUploadFile: any;
  public qualificationUploadFileSuccessfully: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<RootState>,
    private readonly employerApiService: EmployerApiService,
    private readonly toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.store$.select(getUserLoggedInEmail).pipe(
      tap((email) => {
        this.userLoggedEmailId = email,
        this.initForm();
      })
    ).subscribe();
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
        this.employerApiService.addEmployerDetail(this.detailForm.value).pipe(
          tap(res => {
            this.toastrService.success('Detail Added Successfully');
            this.store$.dispatch(new GoToDashboard());
          })
        ).subscribe();
      }
    }
  }

  public get f() { return this.detailForm.controls; }

  private initForm(): void {
    this.detailForm = this.fb.group({
      email: [this.userLoggedEmailId, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      country: ['', [Validators.required, Validators.maxLength(32)]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      companyName: ['', [Validators.required, Validators.maxLength(32)]],
      companySize: ['', [Validators.required, Validators.maxLength(32)]],
      businessNature: ['', [Validators.required]],
    });
  }

}
