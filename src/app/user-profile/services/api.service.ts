import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@core/services';
import { endpoints } from '@shared/endpoints/auth-api-endpoints';
import { EmployeeDetail, EmployeeDetailApiReuestModel, EmployerDetailApiRequestModel, EmployersDetail } from '../models/employee-detail.model';

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

  public getAllEmployersdetail(): Observable<EmployersDetail[]> {
    return this.restService.get(endpoints.updateEmployerDetail);
  }

  public getEmployerDetailById(employerId: string): Observable<EmployersDetail> {
    return this.restService.get(`${endpoints.updateEmployerDetail}/${employerId}`);
  }

  public addEmployeeDetail(payload: EmployeeDetailApiReuestModel): Observable<any> {
    return this.restService.post(endpoints.updateEmployeeDetail, payload);
  }

  public addEmployerDetail(payload: EmployerDetailApiRequestModel): Observable<any> {
    return this.restService.post(endpoints.updateEmployerDetail, payload);
  }

  public deleteEmployeeById(userId: string): Observable<any> {
    return this.restService.delete(`${endpoints.updateEmployeeDetail}/${userId}`);
  }

  public deleteEmployerById(employerId: string): Observable<any> {
    return this.restService.delete(`${endpoints.updateEmployeeDetail}/${employerId}`);
  }

  public updateEmployeeById(userId: string, payload: any): Observable<any> {
    return this.restService.put(`${endpoints.updateEmployeeDetail}/${userId}`, payload);
  }

  public updateEmployerById(employerId: string, payload: any): Observable<any> {
    return this.restService.put(`${endpoints.updateEmployeeDetail}/${employerId}`, payload);
  }
}
