import { Injectable } from '@angular/core';
import { RestService } from '@app/core/services';
import { Observable, of } from 'rxjs';
import { endpoints } from '../endpoints/auth-api-endpoints';
import { CreateAccountApiRequestModel, LoginApiReuestModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly restService: RestService
  ) { }

  public login(payload: LoginApiReuestModel): Observable<any> {
    return this.restService.post(endpoints.login, payload);
  }

  public createAccount(payload: CreateAccountApiRequestModel): Observable<any>{
    console.log('payload', payload);
    return this.restService.post(endpoints.createAccount, payload);
  }
}
