import { Component, OnInit } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { RootState, GoToDashboard, LogOut } from '@app/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DeviceScreenSizeService } from '@app/core/services/device-screen-size/device-screen-size.service';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';

@Component({
  selector: 'app-navigation-left-menu',
  templateUrl: './navigation-left-menu.component.html',
  styleUrls: ['./navigation-left-menu.component.scss']
})
export class NavigationLeftMenuComponent implements OnInit {

  public isLargeDevices$: Observable<boolean>;
  public isUserLoggedIn$: Observable<boolean> = this.store$.select(fromUserDetailsSelector.isUserLoggedIn);
  public sidenavMenu = [
    { name: 'Find jobs', icon: 'work_outline', action: new GoToDashboard(), actionDescription: 'GoToFindJobs', permissions: [] },
    // { name: 'Company Review', icon: 'power_settings_new', action: new LogOut(), actionDescription: 'Logout', permissions: [] },
    // { name: 'Find salaries', icon: 'power_settings_new', action: new LogOut(), actionDescription: 'Logout', permissions: [] },
    { name: 'Employers', icon: 'groups', action: new LogOut(), actionDescription: 'GoToEmployersSection', permissions: [] }
  ];
  public sidenavMenuAfterLogin = [
    { name: 'Profile', icon: 'info', action: new GoToDashboard(), actionDescription: 'GoToFindJobs', permissions: [] },
    { name: 'My jobs', icon: 'work_outline', action: new GoToDashboard(), actionDescription: 'GoToFindJobs', permissions: [] },
    // { name: 'My reviews', icon: 'power_settings_new', action: new LogOut(), actionDescription: 'Logout', permissions: [] },
    // { name: 'Find Salaries', icon: 'power_settings_new', action: new LogOut(), actionDescription: 'Logout', permissions: [] },
    { name: 'Account', icon: 'account_circle', action: new LogOut(), actionDescription: 'Logout', permissions: [] },
    { name: 'Sign out', icon: 'power_settings_new', action: new LogOut(), actionDescription: 'GoToEmployersSection', permissions: [] }
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

  public triggerAction(action: Action, actionDescription: string): void {
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
