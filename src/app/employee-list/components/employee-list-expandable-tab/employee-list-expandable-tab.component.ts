import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '@app/store/models/root-state.model';
import { EmployeesDetail } from '@app/employee-profile/models/employee-detail.model';
import { UpdateApplicationId } from '@app/store';
import { GoToApplicationListing } from '@app/job-application-list/job-application-list-routing.actions';
import { isLoggedInUserAdmin } from '@app/models/data.model';

@Component({
  selector: 'app-employee-list-expandable-tab',
  templateUrl: './employee-list-expandable-tab.component.html',
  styleUrls: ['./employee-list-expandable-tab.component.scss']
})
export class EmployeeListExpandableTabComponent implements OnInit {

  @Input() public employeeList: EmployeesDetail[];
  @Output() public employeeSelected = new EventEmitter<EmployeesDetail>();
  @Output() public pageChange = new EventEmitter<any>();
  public loader = true;
  public isDescendingByDate = true;
  public isLoggedInUserAdmin = isLoggedInUserAdmin();

  constructor(
    public readonly store$: Store<RootState>
  ) { }

  public ngOnInit(): void {
    setTimeout(() => this.loader = false, 200);
  }

  public onPageChange(event): any {
    this.pageChange.emit(event);
  }

  public GoToApplicationList(jobId: string): void {
    this.store$.dispatch(new UpdateApplicationId({updateApplicationId: jobId, mode: 'employeeId'}));
    this.store$.dispatch(new GoToApplicationListing());
  }

}
