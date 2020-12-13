import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import * as RouterActions from './router.actions';
import { Go } from './router.actions';
import { RouterState } from './router.reducer';

@Injectable()
export class RouterEffects {

    constructor(
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

    private navigateTo(path: string[], queryParams: object = {}): void {
        this.router.navigate(path, { queryParams });
    }
}
