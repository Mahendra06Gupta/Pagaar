import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { RootState } from '@app/store';
import { getUserLoggedInEmail } from '@app/store/user-details/user-details.selectors';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { ApiService } from '@app/user-profile/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class UserProfileComponent implements OnInit {

  @ViewChild('skillList', { static: true })
  public skillList: MatChipList;
  @ViewChild('hobbiesList', { static: true })
  public hobbiesList: MatChipList;

  public detailForm: FormGroup;
  public userLoggedEmailId: string;
  public dateTo: moment.Moment = moment();
  public maritalStatus = ['MARRIED', 'UNMARRIED'];
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public matcher = new MyErrorStateMatcher();
  public step = 0;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<RootState>,
    private readonly apiService: ApiService
  ) {}

  public ngOnInit(): void {
    this.store$.select(getUserLoggedInEmail).pipe(
      tap((email) => {
        this.userLoggedEmailId = email,
        this.initForm();
      })
    ).subscribe();
    this.detailForm.get('skills').statusChanges.subscribe(status =>
      this.skillList.errorState = status === 'INVALID');
    this.detailForm.get('hobbies').statusChanges.subscribe(status =>
        this.hobbiesList.errorState = status === 'INVALID');
  }

  public onFromDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.detailForm.get('dob').setValue(event.value);
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.detailForm.controls[controlName].hasError(errorName);
  }

  private initForm(): void {
    this.detailForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(32)]],
      lastName:  ['', [Validators.required, Validators.maxLength(32)]],
      email: [this.userLoggedEmailId, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      dob: ['', [Validators.required, Validators.maxLength(32)]],
      address: ['', [Validators.required, Validators.maxLength(32)]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      qualification: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      nationality: ['', [Validators.required, Validators.maxLength(32)]],
      idProof: ['', [Validators.required]],
      skills: this.fb.array([], [Validators.required]),
      hobbies: this.fb.array([], [Validators.required]),
      numberOfYears: ['', [Validators.required, Validators.pattern('^[0-9]{2}$')]],
      jobDetails: this.fb.array([this.createExperienceJobDetailsFromGroup()])
    });
  }

  public getSkillsOrHobbies(formControlName: string): string[] {
    return this.getSkillOrHobbiesFormControl(formControlName).value;
  }

  public addSkillsOrHobbies(event: MatChipInputEvent, formControlName: string): void {
    const allSkillsControl = this.getSkillOrHobbiesFormControl(formControlName);

    if (!(event.value || '').trim()) {
      allSkillsControl.updateValueAndValidity();
      return;
    }

    const skillNameToAdd = event.value.trim().toLowerCase();

    if (this.getSkillsOrHobbies(formControlName).indexOf(skillNameToAdd) < 0) {
      const domainToAddControl = this.fb.control(skillNameToAdd);
      allSkillsControl.push(domainToAddControl);
    }

    if (event.input) {
      event.input.value = '';
    }
  }

  public removeSkillsOrHobbies(skillOrHobbies: string, formControlName: string): void {
    const idx = this.getSkillsOrHobbies(formControlName).indexOf(skillOrHobbies);
    if (idx >= 0) {
      this.getSkillOrHobbiesFormControl(formControlName).removeAt(idx);
    }
  }


  public setStep(index: number): void {
    this.step = index;
  }

  public nextStep(): void {
    if (this.detailForm.value.hobbies.length === 0) {
      this.hobbiesList.errorState = true;
    }
    if (this.detailForm.value.skills.length === 0) {
      this.skillList.errorState = true;
    }
    this.step++;
  }

  public prevStep(): void {
    this.step--;
  }

  public onSubmit(): void {
    if (this.detailForm.invalid) {
      return;
    }
    const payload = {
      ...this.detailForm.value,
      name: `${this.detailForm.value.firstName} ${this.detailForm.value.lastName}`,
      experience: {
        numberOfYears: this.detailForm.value.numberOfYears,
        jobDetails: this.detailForm.value.jobDetails
      }
    };
    delete payload.firstName;
    delete payload.lastName;
    delete payload.jobDetails;
    delete payload.numberOfYears;
    this.apiService.addEmployeeDetail(payload).pipe(
      tap(res => {
        console.log(res);
      })
    ).subscribe();
  }


  public addExperienceFormGroup() {
    const experienceJobDetails = this.detailForm.get('jobDetails') as FormArray;
    experienceJobDetails.push(this.createExperienceJobDetailsFromGroup());
  }

  public removeExperienceDetail(i: number) {
    const experienceJobDetails = this.detailForm.get('jobDetails') as FormArray;
    if (experienceJobDetails.length > 1) {
      experienceJobDetails.removeAt(i);
    } else {
      experienceJobDetails.reset();
    }
  }

  public get f() { return this.detailForm.controls; }
  public get t() { return this.f.jobDetails as FormArray; }

  private createExperienceJobDetailsFromGroup(): FormGroup {
    return new FormGroup({
      companyName: new FormControl(''),
      designation: new FormControl('')
    });
  }

  private getSkillOrHobbiesFormControl(formControlName: string): FormArray {
    return this.detailForm.get(formControlName) as FormArray;
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {

  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return (control && control.invalid && control.hasError('required'));
  }
}
