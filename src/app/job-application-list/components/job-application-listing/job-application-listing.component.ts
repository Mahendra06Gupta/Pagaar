import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';

import { RootState } from '@app/store';
import { isLoggedInUserAdmin, isLoggedInUserSuperAdmin } from '@app/models/data.model';
import { DialogService } from '@app/core/services';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { EmployeesDetail } from '@app/employee-profile/models/employee-detail.model';
import { EmployeeDetailsModalComponent } from '@app/shared/popups/employee-details-modal';
import { getApllicationId } from '@app/store/user-details/user-details.selectors';
import { JobApplicationApiService } from '@app/job-application-list/services/job-application-listing-api.service';
import { JobApplicationList, JobApplicationListItem } from '@app/job-application-list/models/job-application-detail.model';

@Component({
  selector: 'app-job-application-listing',
  templateUrl: './job-application-listing.component.html',
  styleUrls: ['./job-application-listing.component.scss']
})
export class JobApplicationListingComponent implements OnInit {

  public jobApplicationList: JobApplicationListItem[];
  public showSpinner = true;
  public pageNumber = 1;
  public pageSize = 10;
  public application: {updateApplicationId: string, mode: string};
  public pageTitle: string;

  constructor(
    private readonly dialogService: DialogService,
    private readonly store$: Store<RootState>,
    private readonly jobApplicationApiService: JobApplicationApiService
  ) {}

  public ngOnInit(): void {
    this.dialogService.isActionDone.subscribe(res => {
      this.store$.select(getApllicationId).pipe(
        first(),
        tap((application) => {
          this.application = application;
          this.getPageTitle(this.application.mode);
          this.getJobApplicationById(this.pageSize, this.pageNumber);
        })
      ).subscribe();
    });
  }

  public onPageChange(event) {
    this.pageSize = event.pageSize;
    this.pageNumber = (event.pageIndex + 1);
    this.getJobApplicationById(this.pageSize, this.pageNumber);
  }

  public applicationSelected(employeeDetails: {employee: EmployeesDetail, action: string}): void {
    const employeeDetail = employeeDetails.employee;
    if (employeeDetails.action === 'details') {
      this.dialogService.openDialog(EmployeeDetailsModalComponent, {
        employeeDetail
      });
    } else if (employeeDetails.action === 'cancel') {
      this.showSpinner = true;
      this.deleteEmployerSelected(employeeDetails.employee.id);
    }
  }

  public deleteEmployerSelected(employeeId: string): void {
    this.dialogService.openDialog(ActionModalComponent, {
      warningText: 'Are you sure you want to delete the selected employer?',
      modelTitle: 'Delete Job',
      allowCancel: true,
      warningTextIcon: 'cancel',
      actionText: 'Delete',
      actionFor: 'Employee',
      employeeId
    }).subscribe((res) => {
      this.showSpinner = false;
    });
  }

  private getJobApplicationById(pageSize?: number, pageNumber?: number) {
    this.jobApplicationApiService.getJobApplicationBasedOnId(this.application).pipe(
      tap((jobApplicationDetails: JobApplicationList) => {
        this.jobApplicationList = jobApplicationDetails.items;
        this.showSpinner = false;
      }, () => this.showSpinner = false)
    ).subscribe();
  }

  private getPageTitle(mode: string): void {
    switch (mode) {
      case 'jobId' :
        this.pageTitle = 'job';
        break;
      case 'employerId' :
        this.pageTitle = 'employer';
        break;
      case 'employeeId' :
        this.pageTitle = 'employee';
        break;
    }
  }
}
