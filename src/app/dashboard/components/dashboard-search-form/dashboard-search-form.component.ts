import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { RootState } from '@app/store';
import { DashboardApiService } from '@app/dashboard/services/dashboard-api.service';
import { InitDashboardSearch, UpdateDashboardSearchResult } from '@app/dashboard/store';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dashboard-search-form',
  templateUrl: './dashboard-search-form.component.html',
  styleUrls: ['./dashboard-search-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardSearchFormComponent implements OnInit {

  public searchForm: FormGroup;
  public showToastForError = false;
  public showErrorForJobTitle = false;
  @Output() public search: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<RootState>,
    private readonly toastr: ToastrService,
    private readonly dashboardApiService: DashboardApiService
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public isFormValid(): boolean {
    if (!this.searchForm.value.jobTitle && !this.searchForm.value.location) {
      this.showToastForError = true;
      return true;
    } else if (!this.searchForm.value.jobTitle) {
      this.showErrorForJobTitle = true;
      return true;
    } else {
      return false;
    }
  }

  public onSubmit(): void {
    if (this.isFormValid()) {
      return;
    } else {
      this.store$.dispatch(new InitDashboardSearch({...this.searchForm.value, initiated: true, pageNumber: 1, pageSize: 10}));
      this.dashboardApiService.getJobDetailByTitleAndLocation({...this.searchForm.value, pageNumber: 1, pageSize: 10}).pipe(
        first(),
        tap(res => {
          this.store$.dispatch(new UpdateDashboardSearchResult(res));
          this.search.emit();
        })
      ).subscribe();
    }
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.searchForm.controls[controlName].hasError(errorName);
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      jobTitle: ['', [Validators.nullValidator]],
      location: ['', [Validators.nullValidator]],
    });
  }

}
