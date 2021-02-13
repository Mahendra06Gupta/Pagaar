import { Component, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { RootState } from '@app/store/models/root-state.model';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { EmployeesDetail } from '@app/employee-profile/models/employee-detail.model';
import { isLoggedInUserSuperAdmin } from '@app/models/data.model';
import { UpdateApplicationId } from '@app/store';
import { GoToApplicationListing } from '@app/job-application-list/job-application-list-routing.actions';

@Component({
  selector: 'app-employee-list-tab',
  templateUrl: './employee-list-tab.component.html',
  styleUrls: ['./employee-list-tab.component.scss']
})
export class EmployeeListTabComponent implements OnChanges {

  @Input() public employeeList: EmployeesDetail[];
  @Output() public employeeSelected = new EventEmitter<EmployeesDetail>();
  @Output() public pageChange = new EventEmitter<any>();
  public loader = true;
  public isDescendingByDate = true;
  public dataSource: MatTableDataSource<EmployeesDetail>;
  public isLoggedInUserSuperAdmin = isLoggedInUserSuperAdmin();

  public columnDefinitions = [
    { def: 'name', show: true },
    { def: 'email', show: true },
    { def: 'dob', show: true },
    { def: 'contactNumber', show: true },
    { def: 'nationality', show: true },
    { def: 'experience', show: true },
    { def: 'action', show: this.isLoggedInUserSuperAdmin },
    { def: 'detail', show: true }
  ];

  constructor(
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.employeeList);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => this.loader = false, 200);
    // this.dialogService.isActionDone.subscribe(res => {
    //   if (res && res.length !== 0) {
    //     this.dataSource = new MatTableDataSource(res);
    //     this.dataSource.paginator = this.paginator;
    //   }
    // });
  }

  public getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter(cd => cd.show)
      .map(cd => cd.def);
  }

  public GoToApplicationList(employeeId: string): void {
    this.store$.dispatch(new UpdateApplicationId({updateApplicationId: employeeId, mode: 'employeeId'}));
    this.store$.dispatch(new GoToApplicationListing());
  }

  // public onPageChange(event): any {
  //   this.pageChange.emit(event);
  // }

}
