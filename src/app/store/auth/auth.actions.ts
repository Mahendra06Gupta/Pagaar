import { Action } from '@ngrx/store';
import { Go } from '../router/router.actions';
import { MainRoutes } from '@app/app.route-names';

export const CLEAR_STORE_AFTER_LOGOUT = '[AUTH] CLEAR_STORE_AFTER_LOGOUT';

export class LogOut extends Go {
    public constructor() {
        super({path: [`${MainRoutes.logout}`]});
    }
}

export class ClearStoreAfterLogout implements Action {
    public readonly type = CLEAR_STORE_AFTER_LOGOUT;
}
