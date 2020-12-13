import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState, fromUserSelector } from '@app/store';


@Directive({
    selector: '[hasPermission]'
})
export class HasPermissionDirective {
    private currentUser: string;
    private currentUserAccess: string;
    private permissions = [];

    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private store$: Store<RootState>
    ) {}

    private updateView() {
        this.store$.select(fromUserSelector.getUserLoggedInName).subscribe(res => this.currentUser = res);
        this.store$.select(fromUserSelector.getUserLoggedInType).subscribe(res => this.currentUserAccess = res);
        if (this.checkPermission()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    @Input()
    set hasPermission(val) {
        this.permissions = val;
        this.updateView();
    }

    private checkPermission() {
        if (!this.permissions.length) {
            return true;
        }
        const hasPermission = false;
        if (this.currentUser && this.currentUserAccess) {
            const userRoles = this.currentUserAccess;
            return this.permissions.some((permission) => this.existPermission(userRoles, permission));
        }

        return hasPermission;
    }

    existPermission(userRoles: string, permission): boolean {
        return userRoles.toUpperCase() === permission.toUpperCase();
    }
}