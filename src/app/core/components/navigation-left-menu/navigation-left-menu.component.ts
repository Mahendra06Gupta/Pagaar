import { Component, OnInit } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { RootState, GoToDashboard, GoToConference, LogOut } from '@app/store';
import { map } from 'rxjs/operators';
import { DeviceScreenSizeService } from '@app/core/services/device-screen-size/device-screen-size.service';
import { Observable } from 'rxjs';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';

@Component({
  selector: 'app-navigation-left-menu',
  templateUrl: './navigation-left-menu.component.html',
  styleUrls: ['./navigation-left-menu.component.scss']
})
export class NavigationLeftMenuComponent implements OnInit {

  public isLargeDevices$: Observable<boolean>;
  public sidenavMenu = [
    { name: 'Individual VC', icon: 'video_label', action: new GoToDashboard(), actionDescription: 'GoToBooking', permissions: []},
    { name: 'Add Conference', icon: 'meeting_room', action: new GoToConference(), actionDescription: 'GoToConference', permissions: ['admin']},
    { name: 'Logout', icon: 'power_settings_new', action: new LogOut(), actionDescription: 'Logout', permissions: []}
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
