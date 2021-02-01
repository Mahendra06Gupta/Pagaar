import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

import { RootState, LoggedOutSuccessfully, GoToBaseRoute } from '@app/store';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';
import { EmployerApiService } from '@app/employer-profile/services/employer-api.service';

@Component({
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {

  public inputArgs: any;

  constructor(
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService,
    private readonly toastrService: ToastrService,
    private readonly jobPostingApiService: JobPostingApiService,
    private readonly employerApiService: EmployerApiService
  ) { }

  public ngOnInit(): void {
  }

  private triggerSignOutAction(): void {
    this.store$.dispatch(new LoggedOutSuccessfully({loggedIn: false}));
    this.store$.dispatch(new GoToBaseRoute());
  }

  private triggerDeleteJobAction(jobId: string): void {
    this.jobPostingApiService.deleteSelectedJobDetails(jobId).pipe(
      tap(res => {
        this.toastrService.success('Select Job deleted Successfully');
      }, () => {
        this.toastrService.error('Unable to delete job, Please try again after some time');
      })
    ).subscribe();
  }

  private triggerDeleteEmployerAction(employerId: string): void {
    this.employerApiService.deleteEmployerById(employerId).pipe(
      tap(res => {
        this.toastrService.success('Select Employer deleted Successfully');
      }, () => {
        this.toastrService.error('Unable to delete employer, Please try again after some time');
      })
    ).subscribe();
  }

  public triggerSelectedAction(): void {
    switch (this.inputArgs.employerId) {
      case 'Job':
        this.triggerDeleteJobAction(this.inputArgs.jobId);
        break;
      case 'Employer':
        this.triggerDeleteEmployerAction(this.inputArgs.employerId);
        break;
      default:
        this.triggerSignOutAction();
    }
    this.dialogService.closeAllDialogs();
  }

}
