import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { RootState } from '@app/store/models/root-state.model';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { JobReuslt, Jobs } from '@app/dashboard/store/models/dashboard-state.model';

@Component({
  selector: 'app-job-post-list-tab',
  templateUrl: './job-post-list-tab.component.html',
  styleUrls: ['./job-post-list-tab.component.scss']
})
export class JobPostListTabComponent implements OnInit {

  @Input() public jobList: JobReuslt;
  @Output() public postedJobSelected = new EventEmitter<Jobs>();
  public loader = true;
  public isDescendingByDate = true;
  public dataSource: MatTableDataSource<Jobs>;

  public columnDefinitions = [
    { def: 'company', show: true },
    { def: 'jobTitle', show: true },
    { def: 'salary', show: true },
    { def: 'location', show: true },
    { def: 'nature', show: true },
    { def: 'interviewMode', show: true },
    { def: 'deadline', show: true },
    { def: 'action', show: true },
    { def: 'detail', show: true }
  ];

  constructor(
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.jobList.jobs);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => this.loader = false, 200);
    this.dialogService.isRoomAdded.subscribe(res => {
      if (res && res.length !== 0) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  public getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter(cd => cd.show)
      .map(cd => cd.def);
  }

  public sortroomsAsPerDate(): any {
    // this.isDescendingByDate
    // ? this.bookingsVc.sort((a, b) => +new Date (b.date.toString()) - +new Date (a.date.toString()))
    // : this.bookingsVc.sort((a, b) => +new Date (a.date.toString()) - +new Date (b.date.toString()));
    // this.isDescendingByDate = !this.isDescendingByDate;
    // this.dataSource = new MatTableDataSource(this.bookingsVc);
  }

  public cancelRoom(bookingId: string): void {
    this.dialogService.openDialog(ActionModalComponent, {
      warningText: 'Are you sure you want to cancel the meeting?',
      modelTitle: 'Cancel Meeting',
      allowCancel: true,
      warningTextIcon: 'cancel',
      actionText: 'Cancel',
      bookingId
    });
  }

}
