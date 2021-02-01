import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RootState } from '@app/store';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';
import { JobReuslt, Jobs } from '@app/dashboard/store/models/dashboard-state.model';
import { isLoggedInUserAdmin } from '@app/models/data.model';
import { DialogService } from '@app/core/services';
import { PostedJobDetailsModalComponent } from '@app/shared/popups';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { getEmployerEntities } from '@app/store/employer-store/employer.selectors';
import { AddEmployerDetails } from '@app/store/employer-store/employer.actions';
import { EmployerApiService } from '@app/employer-profile/services/employer-api.service';
import { EmployeesDetail } from '@app/employee-profile/models/employee-detail.model';
import { EmployersDetail } from '@app/employer-profile/models/employer-detail.model';
// import { JobPostingComponent } from '../job-posting/job-posting.component';

@Component({
  selector: 'app-employer-listing',
  templateUrl: './employer-listing.component.html',
  styleUrls: ['./employer-listing.component.scss']
})
export class EmployerListingComponent implements OnInit {

  public employerList: EmployersDetail[];
  public showSpinner = true;
  public pageNumber = 1;
  public pageSize = 10;

  constructor(
    private readonly dialogService: DialogService,
    private readonly store$: Store<RootState>,
    private readonly toastrService: ToastrService,
    private readonly jobPostingApiService: JobPostingApiService,
    private readonly employerApiService: EmployerApiService
  ) {}

  public ngOnInit(): void {
    if (isLoggedInUserAdmin()) {
      this.getEmployerDetails(this.pageSize, this.pageNumber);
    }
  }

  private getEmployerDetails(pageSize?: number, pageNumber?: number) {
    this.store$.select(getEmployerEntities).pipe(
      first(),
      switchMap(employerDetails => employerDetails.length
          ? this.employerList = employerDetails
          : this.employerApiService.getAllEmployersdetail().pipe(
            tap((employerDetail) => {
              this.store$.dispatch(new AddEmployerDetails(employerDetail));
          })
        )),
      tap(() => this.showSpinner = false)
    ).subscribe();
  }

  public onPageChange(event) {
    this.pageSize = event.pageSize;
    this.pageNumber = (event.pageIndex + 1);
    this.getEmployerDetails(this.pageSize, this.pageNumber);
  }

  public employerSelected(employerDetails: {employer: Jobs, action: string}): void {
    const jobs = employerDetails.employer;
    if (employerDetails.action === 'details') {
      this.dialogService.openDialog(PostedJobDetailsModalComponent, {
        jobs
      });
    } else if (employerDetails.action === 'cancel') {
      this.showSpinner = true;
      this.deleteEmployerSelected(employerDetails.employer.id);
    }
    // else if (jobDetails.action === 'edit') {
    //   this.dialogService.openDialog(JobPostingComponent,
    //     jobs
    //   ).subscribe(res => this.getJobDetails());
    // }
  }

  public deleteEmployerSelected(employerId: string): void {
    this.dialogService.openDialog(ActionModalComponent, {
      warningText: 'Are you sure you want to delete the selected employer?',
      modelTitle: 'Delete Job',
      allowCancel: true,
      warningTextIcon: 'cancel',
      actionText: 'Delete',
      actionFor: 'Employer',
      employerId
    }).subscribe((res) => {
      this.showSpinner = false;
    });
  }
}
