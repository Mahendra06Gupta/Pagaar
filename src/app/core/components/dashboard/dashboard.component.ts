import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';

import { ContextMenuService } from '../../services/context-menu/context-menu.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
    constructor(public readonly contextMenuService: ContextMenuService) {
    }

    @ViewChild('sideNavContainer', { static: true }) private sideNavContainer: MatSidenavContainer;

    public ngAfterViewInit(): void {
        this.sideNavContainer.autosize = true;
    }

    public toggleSidenavMenu(): void {
        this.contextMenuService.toggleSideMenu();
    }
}
