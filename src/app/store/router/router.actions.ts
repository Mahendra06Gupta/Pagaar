import { Action } from '@ngrx/store';
import { MainRoutes } from '@app/app.route-names';


export const GO = '[Router] Go';

export class Go implements Action {
    public readonly type = GO;

    constructor(public payload: GoNavigationDetails) {
    }
}

export interface GoNavigationDetails {
    path: string[];
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
        super({ path: [`/${MainRoutes.booking}`] });
    }
}

export class GoToConference extends Go {
    constructor() {
        super({ path: [`/${MainRoutes.conference}`] });
    }
}

export class LogOut extends Go {
    constructor() {
        super({ path: [`/${MainRoutes.login}`] });
    }
}
