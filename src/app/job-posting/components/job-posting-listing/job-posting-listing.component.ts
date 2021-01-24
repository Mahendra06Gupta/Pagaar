import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RootState } from '@app/store';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';
import { JobReuslt, Jobs } from '@app/dashboard/store/models/dashboard-state.model';
import { isLoggedInUserAdmin } from '@app/models/data.model';
import { DialogService } from '@app/core/services';
import { PostedJobDetailsModalComponent } from '@app/shared/popups';

@Component({
  selector: 'app-job-posting-listing',
  templateUrl: './job-posting-listing.component.html',
  styleUrls: ['./job-posting-listing.component.scss']
})
export class JobPostingListingComponent implements OnInit {

  public jobList: JobReuslt;
  public showSpinner = true;

  constructor(
    private readonly dialogService: DialogService,
    private readonly store$: Store<RootState>,
    private readonly toastrService: ToastrService,
    private readonly jobPostingApiService: JobPostingApiService
  ) {}

  public ngOnInit(): void {
    if (isLoggedInUserAdmin()) {
      this.getJobDetails();
    }
  }

  private getJobDetails(pageNumber?: number, pageSize?: number) {
    this.jobPostingApiService.getAllJobDetails(pageNumber, pageSize).pipe(
      tap(res => {
        this.showSpinner = false;
        this.jobList = res;
      }, () => {
        this.showSpinner = false;
        this.toastrService.error('Failed to load Job Details');
      })
    ).subscribe();
  }

  public postedJobSelected(transaction: Jobs): void {
    this.dialogService.openDialog(PostedJobDetailsModalComponent, {
        transaction
    });
  }
}
