import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@core/services';
import { endpoints } from '@shared/endpoints/auth-api-endpoints';
import { EmployeeDetail } from '../models/employee-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly restService: RestService
  ) { }

  public getAllEmployeedetail(): Observable<EmployeeDetail[]> {
    return this.restService.get(endpoints.updateEmployeeDetail);
  }

  public getEmployeeDetailByUserId(userId: string): Observable<EmployeeDetail> {
    return this.restService.get(`${endpoints.updateEmployeeDetail}/${userId}`);
  }

  public getEmployeeDetailByEmail(email: string): Observable<EmployeeDetail> {
    return this.restService.get(`${isLoggedInUserEmployee ? endpoints.getEmployeeDetail : endpoints.getEmployerDetail}/${email}`);
  }


  public addEmployeeDetail(payload): Observable<any> {
    console.log('payload', payload);
    return this.restService.post(endpoints.updateEmployeeDetail, payload);
  }

  public deleteEmployeeById(userId: string): Observable<any> {
    return this.restService.delete(`${endpoints.updateEmployeeDetail}/${userId}`);
  }

  public updateEmployeeById(userId: string, payload: any): Observable<any> {
    return this.restService.put(`${endpoints.updateEmployeeDetail}/${userId}`, payload);
  }
}

function isLoggedInUserEmployee(): boolean {
  console.log(JSON.parse(localStorage.getItem('role')).includes('EMPLOYEE'));
  return JSON.parse(localStorage.getItem('role')).includes('EMPLOYEE');
}
