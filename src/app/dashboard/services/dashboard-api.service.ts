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
}
