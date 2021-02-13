import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as RouterActions from './router.actions';
import { Go, GoUsingActiveUserId } from './router.actions';
import { RootState } from '../models/root-state.model';
import { getApllicationId, getUserLoggedInEmail } from '../user-details/user-details.selectors';

@Injectable()
export class RouterEffects {

    constructor(
        private readonly store$: Store<RootState>,
        private readonly actions$: Actions,
        private readonly router: Router,
    ) {
    }

    @Effect({ dispatch: false })
    public navigate$ = this.actions$.pipe(
        ofType(RouterActions.GO),
        map((action: Go) => action),
        tap(
        (action) => {
            return this.navigateTo(action.payload.path, action.payload.query);
        })
    );

    @Effect({ dispatch: false })
    public navigateUsingActiveUserId$ = this.actions$.pipe(
        ofType(RouterActions.GO_USING_ACTIVE_USER_ID),
        map((action: GoUsingActiveUserId) => action.payload),
        withLatestFrom(
            this.store$.select(getUserLoggedInEmail),
            (actionPayload, activeAccountId) => ({
                path: actionPayload.pathSupplier(actionPayload.userId || activeAccountId),
                query: actionPayload.query
            })
        ),
        tap(({ path, query }) => this.navigateTo(path, query))
    );

    @Effect({ dispatch: false })
    public navigateUsingActiveApplicationId$ = this.actions$.pipe(
        ofType(RouterActions.GO_USING_ACTIVE_ID),
        map((action: GoUsingActiveUserId) => action.payload),
        withLatestFrom(
            this.store$.select(getApllicationId),
            (actionPayload, id) => ({
                path: actionPayload.pathSupplier(id.updateApplicationId),
                query: actionPayload.query
            })
        ),
        tap(({ path, query }) => this.navigateTo(path, query))
    );

    private navigateTo(path: string[], queryParams: object = {}): void {
        this.router.navigate(path, { queryParams });
    }
}
