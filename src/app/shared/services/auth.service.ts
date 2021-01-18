import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { endpoints } from '../endpoints/auth-api-endpoints';
import { CreateAccountApiRequestModel, LoginApiReuestModel } from '../models/auth.model';
import { RestService } from '@app/core/services';
import { RootState } from '@app/store';
import { getLoggedUserToken } from '@app/store/user-details/user-details.selectors';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;

  constructor(
    public readonly store$: Store<RootState>,
    private readonly restService: RestService
  ) { }

  public login(payload: LoginApiReuestModel): Observable<any> {
    return this.restService.post(endpoints.login, payload);
  }

  public createAccount(payload: CreateAccountApiRequestModel): Observable<any>{
    return this.restService.post(endpoints.createAccount, payload);
  }

  public getAuthInfo(): string {
    this.store$.select(getLoggedUserToken).pipe(
      tap((res) => this.token = res)
    ).subscribe();

    return this.token;
  }
}
