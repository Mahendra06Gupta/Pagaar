import { Component, OnInit } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { RootState, GoToDashboard, LogOut } from '@app/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DeviceScreenSizeService } from '@app/core/services/device-screen-size/device-screen-size.service';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';
import { GoToJobPosting, GoToJobPostingListing } from '@app/job-posting/job-posting-routing.actions';
import { isLoggedInUserEmployee } from '@app/models/data.model';
import { GoToEmployerActiveAboutMe } from '@app/employer-profile/employer-profile-routing.actions';
import { GoToActiveAboutMe as GoToEmployeeAboutMe } from '@app/employee-profile/employee-profile-routing.actions';
import { getActiveUrl } from '@app/store/router/router.selectors';
import { MainRoutes } from '@app/app.route-names';

@Component({
  selector: 'app-navigation-left-menu',
  templateUrl: './navigation-left-menu.component.html',
  styleUrls: ['./navigation-left-menu.component.scss']
})
export class NavigationLeftMenuComponent implements OnInit {

  public isLoggedInUserEmployee = isLoggedInUserEmployee();
  public isLargeDevices$: Observable<boolean>;
  public isUserLoggedIn$: Observable<boolean> = this.store$.select(fromUserDetailsSelector.isUserLoggedIn);
  public activeUrl$: Observable<string> = this.store$.select(getActiveUrl);
  public sidenavMenu = [
    { name: 'Find jobs', icon: 'work_outline', action: new GoToDashboard(), actionDescription: 'GoToFindJobs', url: '', permissions: [] },
    { name: 'Employers', icon: 'groups', action: new GoToJobPosting(), actionDescription: 'GoToEmployersSection', url: '', permissions: [] }
  ];
  public sidenavMenuAfterLogin = [
    // tslint:disable-next-line: max-line-length
    { name: 'Profile', icon: 'info', action: this.isLoggedInUserEmployee ? new GoToEmployeeAboutMe() : new GoToEmployerActiveAboutMe(), url: this.isLoggedInUserEmployee ? MainRoutes.employeeProfile : MainRoutes.employerProfile , actionDescription: 'GoToFindJobs', permissions: [] },
    // { name: 'My jobs', icon: 'work_outline', action: new GoToDashboard(), actionDescription: 'GoToFindJobs', permissions: [] },
    // { name: 'Account', icon: 'account_circle', action: new LogOut(), actionDescription: 'Logout', permissions: [] },
    // { name: 'Sign out', icon: 'power_settings_new', action: new LogOut(), actionDescription: 'GoToEmployersSection', permissions: [] }
  ];
  public sideNavMenuForEmployerAndAdmin = [
    { name: 'Post jobs', icon: 'groups', action: new GoToJobPosting(), actionDescription: 'GoToJobPosting', url: MainRoutes.jobPosting, permissions: [] },
    { name: 'Job List', icon: 'list', action: new GoToJobPostingListing(), actionDescription: 'GoToJobPostingListing', url: MainRoutes.jobPostingListing, permissions: [] }
  ];

  constructor(
    public readonly store$: Store<RootState>,
    private readonly deviceSizeBreakpointService: DeviceScreenSizeService,
    private readonly dialogService: DialogService
  ) { }

  public ngOnInit(): void {
    this.isLargeDevices$ = this.deviceSizeBreakpointService.isSmallDevice().pipe(
      map(isSmallDevice => !isSmallDevice)
    );
  }

  public triggerAction(action: Action, actionDescription: string, index: number, afterLogin?: boolean): void {
    actionDescription === 'Logout' ? this.triggerLogoutAction() : this.store$.dispatch(action);
  }

  private triggerLogoutAction(): void {
    this.dialogService.openDialog(ActionModalComponent, {
      warningText: 'Are you sure you want to log out?',
      modelTitle: 'Logout',
      warningTextIcon: 'lock',
      actionText: 'Logout',
      allowCancel: true
    });
  }

}
