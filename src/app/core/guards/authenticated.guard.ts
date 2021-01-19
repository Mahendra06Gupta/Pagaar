import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RootState, fromUserSelector, GoToLogin, GoToDashboard } from '@app/store';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(public store$: Store<RootState>) {}

  public canActivateChild(): Observable<boolean> {
    return this.store$.select(fromUserSelector.isUserLoggedIn).pipe(
      map((isAuthenticated: boolean) => isAuthenticated),
      tap(this.redirectToLoginPageIfNotAuthenticated),
    );
  }

  public canActivate(): Observable<boolean> {
    return this.canActivateChild();
  }

  private redirectToLoginPageIfNotAuthenticated = (isAuthenticated: boolean) => {
    if (!isAuthenticated) {
      this.store$.dispatch(new GoToLogin());
    }
  }
}
