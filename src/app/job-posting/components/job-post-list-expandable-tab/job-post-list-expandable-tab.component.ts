import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '@app/store/models/root-state.model';
import { JobReuslt, Jobs } from '@app/dashboard/store/models/dashboard-state.model';

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

  constructor(
    public readonly store$: Store<RootState>
  ) { }

  public ngOnInit(): void {
    setTimeout(() => this.loader = false, 200);
  }

  public onPageChange(event): any {
    this.pageChange.emit(event);
  }

}
