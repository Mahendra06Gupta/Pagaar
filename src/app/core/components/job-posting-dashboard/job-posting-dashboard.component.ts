import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { DeviceScreenSizeService } from '@app/core/services';
import { GoToEmployerActiveAboutMe } from '@app/employer-profile/employer-profile-routing.actions';
import { EmployerApiService } from '@app/employer-profile/services/employer-api.service';
import { isLoggedInUserAdmin, isLoggedInUserEmployee, isLoggedInUserEmployer } from '@app/models/data.model';
import { RootState } from '@app/store';
import { AddEmployerDetails } from '@app/store/employer-store/employer.actions';
import { getUserLoggedInEmail, isUserLoggedIn } from '@app/store/user-details/user-details.selectors';

import { ContextMenuService } from '@core/services/context-menu/context-menu.service';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
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
        if (isLoggedInUserEmployer()) {
            this.store$.select(getUserLoggedInEmail).pipe(
                first(),
                switchMap(email => email ? this.employerApiService.getEmployerDetailByEmail(email).pipe(
                    tap((details) => {
                        this.store$.dispatch(new AddEmployerDetails([details]));
                        this.isDetailsExists = details ? true : false;
                        this.showSpinner = false;
                    })
                ) : of(null))
            ).subscribe();
        } else if (isLoggedInUserAdmin()) {
            if (isLoggedInUserAdmin()) {
                this.employerApiService.getAllEmployersdetail().pipe(
                    tap((employerDetail) => {
                        this.store$.dispatch(new AddEmployerDetails(employerDetail));
                        this.showSpinner = false;
                        this.isDetailsExists = true;
                    })
                ).subscribe();
            }
        } else {
            this.showSpinner = false;
            this.isDetailsExists = true;
        }
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
