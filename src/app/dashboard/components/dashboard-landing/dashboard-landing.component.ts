import { Component, OnInit } from '@angular/core';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DeviceScreenSizeService } from '@app/core/services';
import { Store } from '@ngrx/store';
import { RootState } from '@app/store';
import { GoToActiveAboutMe } from '@app/employee-profile/employee-profile-routing.actions';
import { EmployeeProfileTab } from '@app/employee-profile/models/employee-profile-routing.path';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';
import { getJobResult, getSearchKeyword, isSearcgInitiated } from '@app/dashboard/store/dashboard.selectors';
import { JobReuslt } from '@app/dashboard/store/models/dashboard-state.model';
import { DashboardApiService } from '@app/dashboard/services/dashboard-api.service';
import { UpdateDashboardSearchResult } from '@app/dashboard/store';
import { dummyData } from '@app/models/dummy-data/dummy-data';
import { AddEmployeeDetails } from '@app/store/employee-store/employee.actions';
import { AddEmployerDetails } from '@app/store/employer-store/employer.actions';
import { ApiService, isLoggedInUserEmployee } from '@app/employee-profile/services/api.service';
import { GoToEmployerActiveAboutMe } from '@app/employer-profile/employer-profile-routing.actions';

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
  public isSearchInitiated: Observable<boolean> = this.store$.select(isSearcgInitiated);
  public popularSearchLine1 = ['Government', 'Online Typing', 'Work From Home', 'Online Tutoring', 'Bank', 'Delivery Executive', 'Healthcare', 'Software', 'MBA', 'Enginerring'];
  public showSpinner = true;
  public jobResult$: Observable<JobReuslt>;
  public isFirstPage = true;
  public isLastPage = false;
  public currentPage = 1;
  public showButtonTillPage = 5;
  public startButtonPage = 0;

  constructor(
    private readonly deviceSizeBreakpointService: DeviceScreenSizeService,
    private readonly store$: Store<RootState>,
    private readonly apiService: ApiService,
    private readonly dashboardApiService: DashboardApiService
  ) { }

  public ngOnInit(): void {
    this.store$.select(fromUserDetailsSelector.getUserLoggedInEmail).pipe(
      first(),
      switchMap(email => email ? this.apiService.getEmployeeDetailByEmail(email).pipe(
        tap((details) => {
          this.store$.dispatch(isLoggedInUserEmployee() ? new AddEmployeeDetails([details]) : new AddEmployerDetails([details]));
          this.isDetailsExists = details ? true : false;
          this.showSpinner = false;
        })
      ) : of(null))
    ).subscribe();
  }

  public goToAboutMe(): void {
    isLoggedInUserEmployee() ? this.store$.dispatch(new GoToActiveAboutMe()) : this.store$.dispatch(new GoToEmployerActiveAboutMe());
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
    console.log(index);
    this.isLastPage = false;
    this.callPaginationApi(false, index);
  }

  public nextPage(index?: number): void {
    this.isFirstPage = false;
    this.callPaginationApi(true, index);
  }

  private callPaginationApi(next: boolean, index?: number): void {
    this.currentPage = index ? index : next ? this.currentPage + 1 : this.currentPage - 1;
    if (this.currentPage >= 4) {
      this.startButtonPage = this.currentPage - 3;
      this.showButtonTillPage = this.currentPage + 2;
    } else if (this.currentPage < 4) {
      this.showButtonTillPage = 5;
      this.startButtonPage = 0;
    }
    this.store$.select(getSearchKeyword).pipe(
      switchMap(res => this.dashboardApiService.getJobDetailByTitleAndLocation({...res, pageNumber: this.currentPage, pageSize: this.currentPage * 10}).pipe(
        first(),
        tap(search => {
          search.totalItems > 0 ? this.store$.dispatch(new UpdateDashboardSearchResult(search)) : this.store$.dispatch(new UpdateDashboardSearchResult(dummyData));
        })
      ))
    ).subscribe();
  }

}
