import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { RootState, fromRouterSelector, GoToBooking } from '@app/store';
import { DeviceScreenSizeService } from '@app/core/services/device-screen-size/device-screen-size.service';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { ActionModalComponent } from '@app/shared/components/action-modal/action-modal.component';
import { isIamLoginPageORCreateAccountPage } from '@app/store/router/router.selectors';

@Component({
  selector: 'app-navigation-top-menu',
  templateUrl: './navigation-top-menu.component.html',
  styleUrls: ['./navigation-top-menu.component.scss']
})
export class NavigationTopMenuComponent implements OnInit, OnDestroy {

  public isLargeDevices$: Observable<boolean>;
  public isSignedIn$: Observable<boolean>;
  public isLoginPage$: Observable<boolean> = this.store$.select(isIamLoginPageORCreateAccountPage);
  public showActions: boolean;
  public userLoggedIn$: Observable<string> = this.store$.select(fromUserDetailsSelector.getUserLoggedInName);
  public activeRoute: string;
  public subscriptionArray: Subscription[] = [];

  constructor(
    private readonly deviceSizeBreakpointService: DeviceScreenSizeService,
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService
  ) { }

  @HostListener('body:click', ['$event'])
  public handleClickEvent(e: MouseEvent): void {
    if (e.target && !(e.target as HTMLElement).classList.contains('menu-trigger')) {
      this.showActions = false;
    }
    if (e.target && (e.target as HTMLElement).classList.contains('menu-trigger')) {
      this.showActions = true;
    }
  }

  public ngOnInit(): void {
    this.subscriptionArray.push(this.store$.select(fromRouterSelector.getActiveUrl).subscribe(
      res => res ? this.activeRoute = res.replace('/', '') : ''
    )),
    this.isSignedIn$ = this.store$.select(fromUserDetailsSelector.isUserLoggedIn);
    this.isLargeDevices$ = this.deviceSizeBreakpointService.isSmallDevice().pipe(
      map(isSmallDevice => !isSmallDevice)
    );
  }

  public triggerAction(): void {
    this.dialogService.openDialog(ActionModalComponent, {
      warningText: 'Are you sure you want to log out?',
      modelTitle: 'Logout',
      warningTextIcon: 'lock',
      actionText: 'Logout',
      allowCancel: true
    });
  }

  public goToBooking(): void {
    this.store$.dispatch(new GoToBooking());
  }

  public ngOnDestroy(): void {
    if (this.subscriptionArray && this.subscriptionArray.length > 0) {
      this.subscriptionArray.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
  }

}
