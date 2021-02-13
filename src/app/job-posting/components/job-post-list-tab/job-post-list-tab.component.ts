import { Component, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { RootState } from '@app/store/models/root-state.model';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { JobReuslt, Jobs } from '@app/dashboard/store/models/dashboard-state.model';
import { isLoggedInUserSuperAdmin } from '@app/models/data.model';
import { GoToApplicationListing } from '@app/job-application-list/job-application-list-routing.actions';
import { UpdateApplicationId } from '@app/store';

@Component({
  selector: 'app-job-post-list-tab',
  templateUrl: './job-post-list-tab.component.html',
  styleUrls: ['./job-post-list-tab.component.scss']
})
export class JobPostListTabComponent implements OnChanges {

  @Input() public jobList: JobReuslt;
  @Output() public postedJobSelected = new EventEmitter<Jobs>();
  @Output() public pageChange = new EventEmitter<any>();
  public loader = true;
  public isDescendingByDate = true;
  public dataSource: MatTableDataSource<Jobs>;
  public isLoggedInUserSuperAdmin = isLoggedInUserSuperAdmin();

  public columnDefinitions = [
    { def: 'company', show: true },
    { def: 'jobTitle', show: true },
    { def: 'salary', show: true },
    { def: 'location', show: true },
    { def: 'nature', show: true },
    { def: 'interviewMode', show: true },
    { def: 'deadline', show: true },
    { def: 'action', show: this.isLoggedInUserSuperAdmin },
    { def: 'detail', show: true }
  ];

  constructor(
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.jobList.jobs);
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

  public onPageChange(event): void {
    this.pageChange.emit(event);
  }

  public GoToApplicationList(jobId: string): void {
    this.store$.dispatch(new UpdateApplicationId({updateApplicationId: jobId, mode: 'jobId'}));
    this.store$.dispatch(new GoToApplicationListing());
  }

}
