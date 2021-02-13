import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '@core/services';
import { endpoints } from '@shared/endpoints/auth-api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationApiService {

  constructor(
    private readonly restService: RestService
  ) { }

  public getJobApplicationBasedOnId({updateApplicationId, mode}): Observable<any> {
    switch (mode) {
      case 'jobId' : return this.getJobApplicationByJobId(updateApplicationId);
      case 'employerId' : return this.getJobApplicationByEmployerId(updateApplicationId);
      case 'employeeId' : return this.getJobApplicationByEmployeeId(updateApplicationId);
    }
  }

  public getJobApplicationByJobId(id: string): Observable<any> {
    return this.restService.get(`${endpoints.jobs}${id}/applications`);
  }

  public getJobApplicationByEmployerId(id: string): Observable<any> {
    return this.restService.get(`${endpoints.jobs}applications/employer/${id}`);
  }

  public getJobApplicationByEmployeeId(id: string): Observable<any> {
    return this.restService.get(`${endpoints.jobs}applications/employee/${id}`);
  }
}
