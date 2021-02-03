import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@core/services';
import { endpoints } from '@shared/endpoints/auth-api-endpoints';
import { EmployerDetailApiRequestModel, EmployersDetail } from '../models/job-posting-detail.model';
import { HttpParams } from '@angular/common/http';
import { JobReuslt } from '@app/dashboard/store/models/dashboard-state.model';

@Injectable({
  providedIn: 'root'
})
export class JobPostingApiService {

  constructor(
    private readonly restService: RestService
  ) { }

  public addJobDetail(payload): Observable<any> {
    return this.restService.post(endpoints.jobs , payload);
  }

  public updateJobDetail(payload): Observable<any> {
    return this.restService.put(endpoints.jobs , payload);
  }

  public getAllJobDetails(pageSize?: number, pageNumber?: number): Observable<JobReuslt> {
    let params: HttpParams = new HttpParams();
    if (pageNumber) {
      params = params.append('page', pageNumber.toString());
    }
    if (pageSize) {
      params = params.append('size', pageSize.toString());
    }
    return this.restService.get(`${endpoints.jobs}?${params}`);
  }

  public deleteSelectedJobDetails(jobId: string): Observable<any> {
    return this.restService.delete(`${endpoints.jobs}/${jobId}`);
  }
}
