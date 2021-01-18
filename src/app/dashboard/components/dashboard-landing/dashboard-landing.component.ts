import { Component, OnInit } from '@angular/core';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DeviceScreenSizeService } from '@app/core/services';
import { Store } from '@ngrx/store';
import { RootState } from '@app/store';
import { GoToActiveAboutMe } from '@app/employee-profile/employee-profile-routing.actions';
import { UserProfileTab } from '@app/employee-profile/models/employee-profile-routing.path';
import { ApiService } from '@app/employee-profile/services/api.service';
import { AddEmployeeDetails } from '@app/store/employee-store/employee.actions';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';
import { getJobResult, isSearcgInitiated } from '@app/dashboard/store/dashboard.selectors';
import { JobReuslt } from '@app/dashboard/store/models/dashboard-state.model';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.scss']
})
export class DashboardLandingComponent implements OnInit {

  public isDetailsExists: boolean;
  public userProfileTab = UserProfileTab;
  public hideUpdateProfileMessage = false;
  public isLargeDevices$: Observable<boolean> = this.deviceSizeBreakpointService.isSmallDevice().pipe(
    map(isSmallDevice => !isSmallDevice)
  );
  public isUserLoggedIn$: Observable<boolean> = this.store$.select(fromUserDetailsSelector.isUserLoggedIn);
  public isSearchInitiated: Observable<boolean> = this.store$.select(isSearcgInitiated);
  public popularSearchLine1 = ['Government', 'Online Typing', 'Work From Home', 'Online Tutoring', 'Bank', 'Delivery Executive', 'Healthcare', 'Software', 'MBA', 'Enginerring'];
  public showSpinner = false;
  public jobResult$: Observable<JobReuslt>;

  constructor(
    private readonly deviceSizeBreakpointService: DeviceScreenSizeService,
    private readonly store$: Store<RootState>,
    private readonly apiService: ApiService
  ) { }

  public ngOnInit(): void {
    // this.store$.select(fromUserDetailsSelector.getUserLoggedInEmail).pipe(
    //   first(),
    //   switchMap(email => email ? this.apiService.getEmployeeDetailByEmail(email).pipe(
    //     tap((details) => {
    //       this.store$.dispatch(new AddEmployeeDetails([details]));
    //       this.isDetailsExists = details ? true : false;
    //       this.showSpinner = false;
    //     })
    //   ) : of(null))
    // ).subscribe();
  }

  public goToAboutMe(): void {
    this.store$.dispatch(new GoToActiveAboutMe());
  }

  public hideUpdateProfileInfo(): void {
    this.hideUpdateProfileMessage = true;
  }

  public getJobResult(): void {
    this.jobResult$ = this.store$.select(getJobResult);
  }

}
