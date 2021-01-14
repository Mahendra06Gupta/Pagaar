import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';

import { ContextMenuService } from '@core/services/context-menu/context-menu.service';
@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    public menuContextService: ContextMenuService;

    constructor(
        public readonly contextMenuService: ContextMenuService,
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
