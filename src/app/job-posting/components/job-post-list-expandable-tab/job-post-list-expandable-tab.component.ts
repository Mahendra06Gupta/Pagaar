import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '@app/store/models/root-state.model';
import { JobReuslt, Jobs } from '@app/dashboard/store/models/dashboard-state.model';
import { GoToApplicationListing } from '@app/job-application-list/job-application-list-routing.actions';
import { UpdateApplicationId } from '@app/store';
import { isLoggedInUserSuperAdmin } from '@app/models/data.model';

@Component({
  selector: 'app-job-post-list-expandable-tab',
  templateUrl: './job-post-list-expandable-tab.component.html',
  styleUrls: ['./job-post-list-expandable-tab.component.scss']
})
export class JobPostListExpandableTabComponent implements OnInit {

  @Input() public jobList: JobReuslt;
  @Output() public pageChange = new EventEmitter<any>();
  @Output() public postedJobSelected = new EventEmitter<Jobs>();
  public loader = true;
  public isDescendingByDate = true;
  public isLoggedInUserSuperAdmin = isLoggedInUserSuperAdmin();

  constructor(
    public readonly store$: Store<RootState>
  ) { }

  public ngOnInit(): void {
    setTimeout(() => this.loader = false, 200);
  }

  public onPageChange(event): void {
    this.pageChange.emit(event);
  }

  public GoToApplicationList(jobId: string): void {
    this.store$.dispatch(new UpdateApplicationId({updateApplicationId: jobId, mode: 'jobId'}));
    this.store$.dispatch(new GoToApplicationListing());
  }
}
