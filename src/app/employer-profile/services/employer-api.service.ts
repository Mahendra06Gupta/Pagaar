import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@core/services';
import { endpoints } from '@shared/endpoints/auth-api-endpoints';
import { EmployerDetailApiRequestModel, EmployersDetail } from '../models/employer-detail.model';

@Injectable({
  providedIn: 'root'
})
export class EmployerApiService {

  constructor(
    private readonly restService: RestService
  ) { }

  public getAllEmployersdetail(): Observable<EmployersDetail[]> {
    return this.restService.get(endpoints.updateEmployerDetail);
  }

  public getEmployerDetailById(employerId: string): Observable<EmployersDetail> {
    return this.restService.get(`${endpoints.updateEmployerDetail}/${employerId}`);
  }

  public getEmployerDetailByEmail(email: string): Observable<EmployersDetail> {
    return this.restService.get(`${endpoints.getEmployerDetail}/${email}`);
  }

  public addEmployerDetail(payload: EmployerDetailApiRequestModel): Observable<any> {
    return this.restService.post(endpoints.updateEmployerDetail, payload);
  }

  public deleteEmployerById(employerId: string): Observable<any> {
    return this.restService.delete(`${endpoints.updateEmployeeDetail}/${employerId}`);
  }

  public updateEmployerById(employerId: string, payload: any): Observable<any> {
    return this.restService.put(`${endpoints.updateEmployeeDetail}/${employerId}`, payload);
  }
}
