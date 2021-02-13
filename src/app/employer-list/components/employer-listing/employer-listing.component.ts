import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs/operators';

import { RootState } from '@app/store';
import { isLoggedInUserAdmin, isLoggedInUserSuperAdmin } from '@app/models/data.model';
import { DialogService } from '@app/core/services';
import { PostedJobDetailsModalComponent } from '@app/shared/popups';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { getEmployerEntities } from '@app/store/employer-store/employer.selectors';
import { AddEmployerDetails } from '@app/store/employer-store/employer.actions';
import { EmployerApiService } from '@app/employer-profile/services/employer-api.service';
import { EmployersDetail } from '@app/employer-profile/models/employer-detail.model';
import { EmployerProfileComponent } from '@app/employer-profile/components/employer-profile/employer-profile.component';

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
    private readonly employerApiService: EmployerApiService
  ) {}

  public ngOnInit(): void {
    this.dialogService.isActionDone.subscribe(res => {
      if (isLoggedInUserAdmin() || isLoggedInUserSuperAdmin()) {
        this.getEmployerDetails(this.pageSize, this.pageNumber);
      }
    });
  }

  private getEmployerDetails(pageSize?: number, pageNumber?: number) {
    this.store$.select(getEmployerEntities).pipe(
      first(),
      switchMap(employerDetails => employerDetails.length
          ? this.employerList = employerDetails
          : this.employerApiService.getAllEmployersdetail().pipe(
            tap((employerDetail) => {
              this.employerList = employerDetail;
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

  public employerSelected(employerDetails: {employer: EmployersDetail, action: string}): void {
    const jobs = employerDetails.employer;
    if (employerDetails.action === 'details') {
      this.dialogService.openDialog(PostedJobDetailsModalComponent, {
        jobs
      });
    } else if (employerDetails.action === 'cancel') {
      this.showSpinner = true;
      this.deleteEmployerSelected(employerDetails.employer.id);
    } else if (employerDetails.action === 'edit') {
      this.dialogService.openDialog(EmployerProfileComponent,
        jobs
      ).subscribe(res => this.getEmployerDetails(this.pageSize, this.pageNumber));
    }
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
