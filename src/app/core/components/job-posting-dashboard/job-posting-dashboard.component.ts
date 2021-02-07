import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { DeviceScreenSizeService } from '@app/core/services';
import { GoToEmployerActiveAboutMe } from '@app/employer-profile/employer-profile-routing.actions';
import { EmployerApiService } from '@app/employer-profile/services/employer-api.service';
import { isLoggedInUserAdmin, isLoggedInUserEmployer } from '@app/models/data.model';
import { RootState } from '@app/store';
import { AddEmployerDetails } from '@app/store/employer-store/employer.actions';
import { isIamJobPostingPageForEmployerAdmin } from '@app/store/router/router.selectors';
import { getUserLoggedInEmail, isUserLoggedIn } from '@app/store/user-details/user-details.selectors';
import { ContextMenuService } from '@core/services/context-menu/context-menu.service';
@Component({
    templateUrl: './job-posting-dashboard.component.html',
    styleUrls: ['./job-posting-dashboard.component.scss']
})
export class JobPostingDashboardComponent implements OnInit, AfterViewInit {
    public isLargeDevices$: Observable<boolean> = this.deviceSizeBreakpointService.isSmallDevice().pipe(
        map(isSmallDevice => !isSmallDevice)
    );
    public isUserLoggedIn$: Observable<boolean> = this.store$.select(isUserLoggedIn);
    public menuContextService: ContextMenuService;
    public isDetailsExists = false;
    public showSpinner = true;
    public hideUpdateProfileMessage = false;

    constructor(
        private readonly deviceSizeBreakpointService: DeviceScreenSizeService,
        private readonly contextMenuService: ContextMenuService,
        private readonly store$: Store<RootState>,
        private readonly employerApiService: EmployerApiService
    ) {}

    @ViewChild('sideNavContainer') private sideNavContainer: MatSidenavContainer;

    public ngOnInit(): void {
        this.menuContextService = this.contextMenuService;
        this.store$.select(isIamJobPostingPageForEmployerAdmin).pipe(
            switchMap((isIamJobPostingPage) => {
                if (isIamJobPostingPage) {
                    if (isLoggedInUserEmployer()) {
                        return this.store$.select(getUserLoggedInEmail).pipe(
                            first(),
                            switchMap(email => email ? this.employerApiService.getEmployerDetailByEmail(email).pipe(
                                tap((details) => {
                                    if (details) {
                                        this.store$.dispatch(new AddEmployerDetails([details]));
                                        this.isDetailsExists = details ? true : false;
                                    }
                                    this.showSpinner = false;
                                })
                            ) : of(null))
                        );
                    } else if (isLoggedInUserAdmin()) {
                        return this.employerApiService.getAllEmployersdetail().pipe(
                            first(),
                            tap((employerDetail) => {
                                if (employerDetail) {
                                    this.store$.dispatch(new AddEmployerDetails(employerDetail));
                                    this.isDetailsExists = true;
                                }
                                this.showSpinner = false;
                            })
                        );
                    } else {
                        this.showSpinner = false;
                        this.isDetailsExists = true;
                        return of(null);
                    }
                } else {
                    this.showSpinner = false;
                    this.isDetailsExists = true;
                    return of(null);
                }
            })
        ).subscribe();
    }

    public ngAfterViewInit(): void {
        this.sideNavContainer.autosize = true;
    }

    public toggleSidenavMenu(): void {
        this.contextMenuService.toggleSideMenu();
    }

    public hideUpdateProfileInfo(): void {
        this.hideUpdateProfileMessage = true;
    }

    public goToAboutMe(): void {
        this.store$.dispatch(new GoToEmployerActiveAboutMe());
    }
}
