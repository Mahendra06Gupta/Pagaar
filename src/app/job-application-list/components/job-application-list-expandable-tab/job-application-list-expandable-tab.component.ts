import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '@app/store/models/root-state.model';
import { EmployeesDetail } from '@app/employee-profile/models/employee-detail.model';
import { JobApplicationListItem } from '@app/job-application-list/models/job-application-detail.model';

@Component({
  selector: 'app-job-application-list-expandable-tab',
  templateUrl: './job-application-list-expandable-tab.component.html',
  styleUrls: ['./job-application-list-expandable-tab.component.scss']
})
export class JobApplicationListExpandableTabComponent implements OnInit {

  @Input() public jobApplicationList: JobApplicationListItem[];
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
