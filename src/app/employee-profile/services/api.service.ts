import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@core/services';
import { endpoints } from '@shared/endpoints/auth-api-endpoints';
import { EmployeeDetailApiReuestModel, EmployeesDetail } from '../models/employee-detail.model';
import { EmployerDetailApiRequestModel, EmployersDetail } from '@app/employer-profile/models/employer-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly restService: RestService
  ) { }

  public getAllEmployeedetail(): Observable<EmployeeDetailApiReuestModel[]> {
    return this.restService.get(endpoints.updateEmployeeDetail);
  }

  public getEmployeeDetailByUserId(userId: string): Observable<EmployeeDetailApiReuestModel> {
    return this.restService.get(`${endpoints.updateEmployeeDetail}/${userId}`);
  }

  public getEmployeeDetailByEmail(email: string): Observable<any> {
    return this.restService.get(`${isLoggedInUserEmployee() ? endpoints.getEmployeeDetail : endpoints.getEmployerDetail}/${email}`);
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

export function isLoggedInUserEmployee(): boolean {
  return JSON.parse(localStorage.getItem('role')).includes('EMPLOYEE');
}
