import { Component, OnInit } from '@angular/core';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { DeviceScreenSizeService, DialogService } from '@app/core/services';
import { RootState } from '@app/store';
import { GoToActiveAboutMe } from '@app/employee-profile/employee-profile-routing.actions';
import { EmployeeProfileTab } from '@app/employee-profile/models/employee-profile-routing.path';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';
import { getJobResult, getSearchKeyword, isSearchInitiated } from '@app/dashboard/store/dashboard.selectors';
import { JobReuslt } from '@app/dashboard/store/models/dashboard-state.model';
import { DashboardApiService } from '@app/dashboard/services/dashboard-api.service';
import { InitDashboardSearch, UpdateDashboardSearchResult } from '@app/dashboard/store';
import { AddEmployeeDetails } from '@app/store/employee-store/employee.actions';
import { ApiService } from '@app/employee-profile/services/api.service';
import { GoToJobPosting } from '@app/job-posting/job-posting-routing.actions';
import { isLoggedInUserEmployee } from '@app/models/data.model';
import { getEmployeeId } from '@app/store/employee-store/employee.selectors';
import { ToastrService } from 'ngx-toastr';
import { EmployerDetailsModalComponent, PostedJobDetailsModalComponent } from '@app/shared/popups';
import { EmployerApiService } from '@app/employer-profile/services/employer-api.service';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.scss']
})
export class DashboardLandingComponent implements OnInit {

  public isDetailsExists: boolean;
  public userProfileTab = EmployeeProfileTab;
  public hideUpdateProfileMessage = false;
  public isLargeDevices$: Observable<boolean> = this.deviceSizeBreakpointService.isSmallDevice().pipe(
    map(isSmallDevice => !isSmallDevice)
  );
  public isUserLoggedIn$: Observable<boolean> = this.store$.select(fromUserDetailsSelector.isUserLoggedIn);
  public isSearchInitiated: Observable<boolean> = this.store$.select(isSearchInitiated);
  public popularSearchLine1 = ['Government', 'Online Typing', 'Work From Home', 'Online Tutoring', 'Bank', 'Delivery Executive', 'Healthcare', 'Software', 'MBA', 'Enginerring'];
  public showSpinner = true;
  public jobResult$: Observable<JobReuslt>;
  public isFirstPage = true;
  public isLastPage = false;
  public currentPage = 1;
  public showButtonTillPage = 5;
  public startButtonPage = 0;
  public isLoggedUserEmployee = isLoggedInUserEmployee();

  constructor(
    private readonly deviceSizeBreakpointService: DeviceScreenSizeService,
    private readonly store$: Store<RootState>,
    private readonly apiService: ApiService,
    private readonly dashboardApiService: DashboardApiService,
    private readonly toastrService: ToastrService,
    private readonly dialogService: DialogService,
    private readonly employerApiService: EmployerApiService,
    private readonly jobPostingApiService: JobPostingApiService
  ) { }

  public ngOnInit(): void {
    this.store$.select(fromUserDetailsSelector.getUserLoggedInEmail).pipe(
      first(),
      switchMap(email => email ? this.apiService.getEmployeeDetailByEmail(email).pipe(
        tap((details) => {
          if (details) {
            this.store$.dispatch(new AddEmployeeDetails([details]));
          }
          this.isDetailsExists = details ? true : false;
          this.showSpinner = false;
        })
      ) : of(null))
    ).subscribe();
    // this.callPaginationApi(false, 1, true);
  }

  public goToAboutMe(): void {
    this.store$.dispatch(new GoToActiveAboutMe());
  }

  public goToEmployerTab(): void {
    this.store$.dispatch(new GoToJobPosting());
  }

  public hideUpdateProfileInfo(): void {
    this.hideUpdateProfileMessage = true;
  }

  public getJobResult(): void {
    this.jobResult$ = this.store$.select(getJobResult);
  }

  public totalPage(pageSize: number): number[] {
    return [...Array(pageSize).keys()];
  }

  public prevPage(index?: number): void {
    this.isLastPage = false;
    this.callPaginationApi(false, index);
  }

  public nextPage(index?: number): void {
    this.isFirstPage = false;
    this.callPaginationApi(true, index);
  }

  public apply(jobId: string, employerId: string): void {
    this.store$.select(getEmployeeId).pipe(
      first(),
      switchMap(employeeId => this.apiService.applyForJob({
        employer: {employerId},
        employee: {employeeId},
        job: {jobId}
      }).pipe(
        tap((res) => this.toastrService.success('Your job application send successfully'),
        () => this.toastrService.error('Failed to send job application, please try after some time'))
      ))
    ).subscribe();
  }

  public search(searchKey: string) {
    this.store$.dispatch(new InitDashboardSearch({jobTitle: searchKey, location: '', initiated: true, pageNumber: 1, pageSize: 10}));
    this.dashboardApiService.getJobDetailByTitleAndLocation({jobTitle: searchKey, location: '',  pageNumber: this.currentPage, pageSize: 10}).pipe(
      first(),
      tap(search => {
        this.store$.dispatch(new UpdateDashboardSearchResult(search));
      })
    ).subscribe();
  }

  private callPaginationApi(next: boolean, index?: number, isNotInvokedBySearch?: boolean): void {
    this.currentPage = index ? index : next ? this.currentPage + 1 : this.currentPage - 1;
    if (this.currentPage >= 4) {
      this.startButtonPage = this.currentPage - 3;
      this.showButtonTillPage = this.currentPage + 2;
    } else if (this.currentPage < 4) {
      this.showButtonTillPage = 5;
      this.startButtonPage = 0;
    }
    this.store$.select(getSearchKeyword).pipe(
      switchMap(res =>
        // isNotInvokedBySearch
        // ? this.dashboardApiService.getAllJobDetails(this.currentPage, 10)
        // :
        this.dashboardApiService.getJobDetailByTitleAndLocation({...res, pageNumber: this.currentPage, pageSize: 10}).pipe(
        first(),
        tap(search => {
          this.store$.dispatch(new UpdateDashboardSearchResult(search));
        })
      ))
    ).subscribe();
  }

  public getDetailByAction(mode: string, id: string) {
    switch (mode) {
      case 'employer':
        this.getDetail(
          this.employerApiService.getEmployerDetailById(id),
          EmployerDetailsModalComponent
        );
        break;
      case 'job':
        this.getDetail(
          this.jobPostingApiService.getJobDetailById(id),
          PostedJobDetailsModalComponent
        );
        break;
    }
  }

  private getDetail(api: Observable<any>, component: any) {
    api.pipe(
      first(),
      tap((res) => res ? this.dialogService.openDialog(component, {
        res
      }) : this.toastrService.warning('No Details Found'))
    ).subscribe();
  }

}
