import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '@app/store/models/root-state.model';
import { EmployeesDetail } from '@app/employee-profile/models/employee-detail.model';

@Component({
  selector: 'app-employee-list-expandable-tab',
  templateUrl: './employee-list-expandable-tab.component.html',
  styleUrls: ['./employee-list-expandable-tab.component.scss']
})
export class EmployeeListExpandableTabComponent implements OnInit {

  @Input() public employeeList: EmployeesDetail[];
  @Output() public pageChange = new EventEmitter<any>();
  public loader = true;
  public isDescendingByDate = true;

  constructor(
    public readonly store$: Store<RootState>
  ) { }

  public ngOnInit(): void {
    setTimeout(() => this.loader = false, 200);
  }

  // public onPageChange(event): any {
  //   this.pageChange.emit(event);
  // }

}
