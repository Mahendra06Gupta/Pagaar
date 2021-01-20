import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { RootState } from '@app/store';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';
import { JobReuslt } from '@app/dashboard/store/models/dashboard-state.model';
import { isLoggedInUserAdmin } from '@app/models/data.model';

@Component({
  selector: 'app-job-posting-listing',
  templateUrl: './job-posting-listing.component.html',
  styleUrls: ['./job-posting-listing.component.scss']
})
export class JobPostingListingComponent implements OnInit {

  public jobList: JobReuslt;

  constructor(
    public readonly store$: Store<RootState>,
    public readonly jobPostingApiService: JobPostingApiService
  ) {}

  public ngOnInit(): void {
    if (isLoggedInUserAdmin()) {
      this.getJobDetails();
    }
  }

  private getJobDetails(pageNumber?: number, pageSize?: number) {
    this.jobPostingApiService.getAllJobDetails(pageNumber, pageSize).pipe(
      tap(res => {
        console.log(res);
        this.jobList = res;
      })
    ).subscribe();
  }
}
