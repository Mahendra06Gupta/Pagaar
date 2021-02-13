import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RootState } from '@app/store';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';
import { isLoggedInUserAdmin, isLoggedInUserSuperAdmin } from '@app/models/data.model';
import { DialogService } from '@app/core/services';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { ApiService } from '@app/employee-profile/services/api.service';
import { AddEmployeeDetails } from '@app/store/employee-store/employee.actions';
import { EmployeesDetail } from '@app/employee-profile/models/employee-detail.model';
import { EmployeeDetailsModalComponent } from '@app/shared/popups/employee-details-modal';

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.scss']
})
export class EmployeeListingComponent implements OnInit {

  public employeeList: EmployeesDetail[];
  public showSpinner = true;
  public pageNumber = 1;
  public pageSize = 10;

  constructor(
    private readonly dialogService: DialogService,
    private readonly store$: Store<RootState>,
    private readonly employeeApiService: ApiService
  ) {}

  public ngOnInit(): void {
    this.dialogService.isActionDone.subscribe(res => {
      if (isLoggedInUserAdmin() || isLoggedInUserSuperAdmin()) {
        this.getEmployeeDetails(this.pageSize, this.pageNumber);
      }
    });
  }

  private getEmployeeDetails(pageSize?: number, pageNumber?: number) {
    this.employeeApiService.getAllEmployeedetail().pipe(
      tap((employeeDetail) => {
        this.showSpinner = false;
        this.employeeList = employeeDetail;
        this.store$.dispatch(new AddEmployeeDetails(employeeDetail));
      }, () => this.showSpinner = false)
    ).subscribe();
  }

  public onPageChange(event) {
    this.pageSize = event.pageSize;
    this.pageNumber = (event.pageIndex + 1);
    this.getEmployeeDetails(this.pageSize, this.pageNumber);
  }

  public employeeSelected(employeeDetails: {employee: EmployeesDetail, action: string}): void {
    const employeeDetail = employeeDetails.employee;
    if (employeeDetails.action === 'details') {
      this.dialogService.openDialog(EmployeeDetailsModalComponent, {
        employeeDetail
      });
    } else if (employeeDetails.action === 'cancel') {
      this.showSpinner = true;
      this.deleteEmployeeSelected(employeeDetails.employee.id);
    }
  }

  public deleteEmployeeSelected(employeeId: string): void {
    this.dialogService.openDialog(ActionModalComponent, {
      warningText: 'Are you sure you want to delete the selected employee?',
      modelTitle: 'Delete Employee',
      allowCancel: true,
      warningTextIcon: 'cancel',
      actionText: 'Delete',
      actionFor: 'Employee',
      employeeId
    }).subscribe((res) => {
      this.showSpinner = false;
    });
  }
}
