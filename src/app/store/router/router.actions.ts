import { Action } from '@ngrx/store';
import { MainRoutes } from '@app/app.route-names';


export const GO = '[Router] Go';
export const GO_USING_ACTIVE_USER_ID = '[Router] GO_USING_ACTIVE_USER_ID';
export const GO_USING_ACTIVE_ID = '[Router] GO_USING_ACTIVE_ID';

export class Go implements Action {
    public readonly type = GO;

    public constructor(public payload: GoNavigationDetails) {
    }
}

export interface GoNavigationDetails {
    path: string[];
    query?: object;
}

export class GoUsingActiveUserId implements Action {
    public readonly type = GO_USING_ACTIVE_USER_ID;

    public constructor(public payload: GoUsingActiveUserIdNavigationDetails) {
    }
}

export class GoUsingActiveId implements Action {
    public readonly type = GO_USING_ACTIVE_ID;

    public constructor(public payload: GoUsingActiveIdNavigationDetails) {
    }
}

export interface GoUsingActiveUserIdNavigationDetails {
    pathSupplier: (userId: string) => string[];
    userId?: string;
    query?: object;
}

export interface GoUsingActiveIdNavigationDetails {
    pathSupplier: (id: string) => string[];
    id?: string;
    query?: object;
}

export class GoToBaseRoute extends Go {
    constructor() {
        super({ path: ['/'] });
    }
}

export class GoToLogin extends Go {
    constructor() {
        super({ path: [`/${MainRoutes.login}`] });
    }
}

export class GoToCreateAccount extends Go {
    constructor() {
        super({ path: [`/${MainRoutes.createAccount}`]});
    }
}

export class GoToDashboard extends Go {
    constructor() {
        super({ path: [`/${MainRoutes.dashboard}`] });
    }
}

export class LogOut extends Go {
    constructor() {
        super({ path: [`/${MainRoutes.login}`] });
    }
}
