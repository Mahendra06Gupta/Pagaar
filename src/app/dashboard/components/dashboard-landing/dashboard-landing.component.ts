import { Component, OnInit } from '@angular/core';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DeviceScreenSizeService } from '@app/core/services';
import { Store } from '@ngrx/store';
import { RootState } from '@app/store';
import { GoToActiveAboutMe } from '@app/user-profile/user-profile-routing.actions';
import { UserProfileTab } from '@app/user-profile/models/user-profile-routing.path';
import { getUserLoggedInEmail } from '@app/store/user-details/user-details.selectors';
import { ApiService } from '@app/user-profile/services/api.service';

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
  public popularSearchLine1 = ['Government', 'Online Typing', 'Work From Home', 'Online Tutoring', 'Bank', 'Delivery Executive', 'Healthcare', 'Software', 'MBA', 'Enginerring'];

  constructor(
    private readonly deviceSizeBreakpointService: DeviceScreenSizeService,
    private readonly store$: Store<RootState>,
    private readonly apiService: ApiService
  ) { }

  public ngOnInit(): void {
    this.store$.select(getUserLoggedInEmail).pipe(
      first(),
      switchMap(email => email ? this.apiService.getEmployeeDetailByEmail(email).pipe(
        tap((details) => this.isDetailsExists = details ? true : false)
      ) : of(null))
    ).subscribe();
  }

  public goToAboutMe(): void {
    this.store$.dispatch(new GoToActiveAboutMe());
  }

  public hideUpdateProfileInfo(): void {
    this.hideUpdateProfileMessage = true;
  }

}
