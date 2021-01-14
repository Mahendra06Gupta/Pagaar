import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { first, map, tap } from 'rxjs/operators';

import { RootState, fromRouterSelector, GoToLogin, GoToBaseRoute, GoToCreateAccount } from '@app/store';
import { DeviceScreenSizeService } from '@app/core/services/device-screen-size/device-screen-size.service';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { isIamLoginPageORCreateAccountPage } from '@app/store/router/router.selectors';
import { DashboardTab } from '@app/dashboard/models/dashboard-routing.path';
import { GoToActiveAboutMe } from '@app/user-profile/user-profile-routing.actions';

@Component({
  selector: 'app-navigation-top-menu',
  templateUrl: './navigation-top-menu.component.html',
  styleUrls: ['./navigation-top-menu.component.scss']
})
export class NavigationTopMenuComponent implements OnInit, OnDestroy {

  public isLargeDevices$: Observable<boolean> = this.deviceSizeBreakpointService.isSmallDevice().pipe(
    map(isSmallDevice => !isSmallDevice)
  );
  public dashboardTab = DashboardTab;
  public isUserLoggedIn$: Observable<boolean> = this.store$.select(fromUserDetailsSelector.isUserLoggedIn);
  public isLoginPage$: Observable<boolean> = this.store$.select(isIamLoginPageORCreateAccountPage);
  public showActions: boolean;
  public loggedInUserEmail: string;
  public activeRoute: string;
  public subscriptionArray: Subscription[] = [];
  public options = [
    {tab: 'Profile', icon: 'description'},
    // {tab: 'My jobs', icon: 'favorite_border'},
    // {tab: 'My reviews', icon: 'rate_review'},
    // {tab: 'Email preferences', icon: 'email'},
    // {tab: 'Search preferences', icon: 'search'},
    {tab: 'Account', icon: 'tune'},
  ];

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
    ));
    this.store$.select(fromUserDetailsSelector.getUserLoggedInEmail).pipe(
      first(),
      tap(email => this.loggedInUserEmail = email)
    ).subscribe();
  }

  // public triggerAction(): void {
  //   this.dialogService.openDialog(ActionModalComponent, {
  //     warningText: 'Are you sure you want to log out?',
  //     modelTitle: 'Logout',
  //     warningTextIcon: 'lock',
  //     actionText: 'Logout',
  //     allowCancel: true
  //   });
  // }

  public goToDashboard(): void {
    this.store$.dispatch(new GoToBaseRoute());
  }

  public ngOnDestroy(): void {
    if (this.subscriptionArray && this.subscriptionArray.length > 0) {
      this.subscriptionArray.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
  }

  public goToLogin(): void {
    this.store$.dispatch(new GoToLogin());
  }

  public goToSignUp(): void {
    this.store$.dispatch(new GoToCreateAccount());
  }

  public goToSectionAsPerUserSelect(tab: string): void {
    switch (tab) {
      case 'Profile': this.store$.dispatch(new GoToActiveAboutMe());
                      break;
    }
  }

}
