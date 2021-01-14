import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { RootState } from '@app/store';
import { getUserLoggedInEmail } from '@app/store/user-details/user-details.selectors';
import { ApiService } from '@app/user-profile/services/api.service';
import { Store } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs/operators';

import { ContextMenuService } from '../../services/context-menu/context-menu.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    public menuContextService: ContextMenuService;
    constructor(
        public readonly contextMenuService: ContextMenuService,
        private readonly store$: Store<RootState>,
        private readonly apiService: ApiService
    ) {}

    @ViewChild('sideNavContainer') private sideNavContainer: MatSidenavContainer;

    public ngOnInit(): void {
        this.menuContextService = this.contextMenuService;
        this.store$.select(getUserLoggedInEmail).pipe(
            first(),
            switchMap(email => this.apiService.getEmployeeDetailByEmail(email).pipe(
                tap((details) => console.log(details))
            ))
        ).subscribe();
    }

    public ngAfterViewInit(): void {
        this.sideNavContainer.autosize = true;
    }

    public toggleSidenavMenu(): void {
        this.contextMenuService.toggleSideMenu();
    }
}
