import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { RootState } from '@app/store';
import { isIamJobPostingPage } from '@app/store/router/router.selectors';

import { ContextMenuService } from '@core/services/context-menu/context-menu.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    public menuContextService: ContextMenuService;
    public isIamJobPostingPage$: Observable<boolean> = this.store$.select(isIamJobPostingPage);

    constructor(
        public readonly contextMenuService: ContextMenuService,
        public readonly store$: Store<RootState>
    ) {}

    @ViewChild('sideNavContainer') private sideNavContainer: MatSidenavContainer;

    public ngOnInit(): void {
        this.menuContextService = this.contextMenuService;
    }

    public ngAfterViewInit(): void {
        this.sideNavContainer.autosize = true;
    }

    public toggleSidenavMenu(): void {
        this.contextMenuService.toggleSideMenu();
    }
}
