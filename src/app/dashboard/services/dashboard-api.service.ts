import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@core/services';
import { endpoints } from '@shared/endpoints/auth-api-endpoints';
import { HttpParams } from '@angular/common/http';
import { JobReuslt } from '../store/models/dashboard-state.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  constructor(
    private readonly restService: RestService
  ) { }

  public getJobDetailByTitleAndLocation({jobTitle, location, pageNumber, pageSize}): Observable<JobReuslt> {
    let params: HttpParams = new HttpParams();
    if (jobTitle) {
      params = params.append('title', jobTitle);
    }
    if (location) {
      params = params.append('location', location);
    }
    if (pageNumber) {
      params = params.append('page', pageNumber);
    }
    if (pageSize) {
      params = params.append('size', pageSize);
    }
    return this.restService.get(`${endpoints.jobSearch}?${params}`);
  }

  // public getEmployeeDetailByEmail(email: string): Observable<EmployeeDetail> {
  //   return this.restService.get(`${endpoints.getEmployeeDetail}/${email}`);
  // }

  // public getAllEmployersdetail(): Observable<EmployersDetail[]> {
  //   return this.restService.get(endpoints.updateEmployerDetail);
  // }

  // public getEmployerDetailById(employerId: string): Observable<EmployersDetail> {
  //   return this.restService.get(`${endpoints.updateEmployerDetail}/${employerId}`);
  // }

  // public addEmployeeDetail(payload): Observable<any> {
  //   console.log('payload', payload);
  //   return this.restService.post(endpoints.updateEmployeeDetail, payload);
  // }

  // public addEmployerDetail(payload: EmployerDetailApiRequestModel): Observable<any> {
  //   return this.restService.post(endpoints.updateEmployerDetail, payload);
  // }

  // public deleteEmployeeById(userId: string): Observable<any> {
  //   return this.restService.delete(`${endpoints.updateEmployeeDetail}/${userId}`);
  // }

  // public deleteEmployerById(employerId: string): Observable<any> {
  //   return this.restService.delete(`${endpoints.updateEmployeeDetail}/${employerId}`);
  // }

  // public updateEmployeeById(userId: string, payload: any): Observable<any> {
  //   return this.restService.put(`${endpoints.updateEmployeeDetail}/${userId}`, payload);
  // }

  // public updateEmployerById(employerId: string, payload: any): Observable<any> {
  //   return this.restService.put(`${endpoints.updateEmployeeDetail}/${employerId}`, payload);
  // }
}
