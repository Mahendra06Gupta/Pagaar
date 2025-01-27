import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RootState } from '@app/store';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';
import { JobReuslt, Jobs } from '@app/dashboard/store/models/dashboard-state.model';
import { isLoggedInUserAdmin, isLoggedInUserEmployer, isLoggedInUserSuperAdmin } from '@app/models/data.model';
import { DialogService } from '@app/core/services';
import { PostedJobDetailsModalComponent } from '@app/shared/popups';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { JobPostingComponent } from '../job-posting/job-posting.component';
import { getLoggedInEmployerId } from '@app/store/employer-store/employer.selectors';

@Component({
  selector: 'app-job-posting-listing',
  templateUrl: './job-posting-listing.component.html',
  styleUrls: ['./job-posting-listing.component.scss']
})
export class JobPostingListingComponent implements OnInit {

  public jobList: JobReuslt;
  public showSpinner = true;
  public pageNumber = 1;
  public pageSize = 10;

  constructor(
    private readonly dialogService: DialogService,
    private readonly store$: Store<RootState>,
    private readonly toastrService: ToastrService,
    private readonly jobPostingApiService: JobPostingApiService
  ) {}

  public ngOnInit(): void {
    this.dialogService.isActionDone.subscribe(res => {
      this.getJobList();
    });
  }

  private getJobList(): void {
    if (isLoggedInUserAdmin() || isLoggedInUserSuperAdmin()) {
      this.getJobDetails(this.pageSize, this.pageNumber);
    } else if (isLoggedInUserEmployer()) {
      this.getJobDetailsByEmployerId(this.pageSize, this.pageNumber);
    }
  }

  private getJobDetails(pageSize?: number, pageNumber?: number) {
    this.jobPostingApiService.getAllJobDetails(pageSize, pageNumber).pipe(
      tap(res => {
        this.showSpinner = false;
        this.jobList = res;
      }, () => {
        this.showSpinner = false;
        this.toastrService.error('Failed to load Job Details');
      })
    ).subscribe();
  }

  private getJobDetailsByEmployerId(pageSize?: number, pageNumber?: number) {
    this.store$.select(getLoggedInEmployerId).pipe(
      first(),
      switchMap(id => this.jobPostingApiService.getJobDetailsByEmployerId(id, pageSize, pageNumber).pipe(
        tap(res => {
          this.showSpinner = false;
          this.jobList = res;
        }, () => {
          this.showSpinner = false;
          this.toastrService.error('Failed to load Job Details');
        })
      ))
    ).subscribe();
  }

  public onPageChange(event) {
    this.pageSize = event.pageSize;
    this.pageNumber = (event.pageIndex + 1);
    this.getJobDetails(this.pageSize, this.pageNumber);
  }

  public postedJobSelected(jobDetails: {job: Jobs, action: string}): void {
    const jobs = jobDetails.job;
    if (jobDetails.action === 'details') {
      this.dialogService.openDialog(PostedJobDetailsModalComponent, {
        jobs
      });
    } else if (jobDetails.action === 'cancel') {
      this.showSpinner = true;
      this.deleteJob(jobDetails.job.id);
    } else if (jobDetails.action === 'edit') {
      this.dialogService.openDialog(JobPostingComponent,
        jobs
      ).subscribe(res => this.getJobDetails(this.pageSize, this.pageNumber));
    }
  }

  public deleteJob(jobId: string): void {
    this.dialogService.openDialog(ActionModalComponent, {
      warningText: 'Are you sure you want to delete the job?',
      modelTitle: 'Delete Job',
      allowCancel: true,
      warningTextIcon: 'cancel',
      actionText: 'Delete',
      actionFor: 'Job',
      jobId
    }).subscribe((res) => {
      this.showSpinner = false;
    });
  }
}
