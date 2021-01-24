import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '@app/store/models/root-state.model';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { JobReuslt } from '@app/dashboard/store/models/dashboard-state.model';

@Component({
  selector: 'app-job-post-list-expandable-tab',
  templateUrl: './job-post-list-expandable-tab.component.html',
  styleUrls: ['./job-post-list-expandable-tab.component.scss']
})
export class JobPostListExpandableTabComponent implements OnInit {

  displayedColumns: string[] = ['roomName', 'roomId', 'date', 'bookedBy', 'slot', 'status', 'bookingId', 'action'];
  @Input() public jobList: JobReuslt;
  // @Input() public showCancel: boolean;
  public loader = true;
  public isDescendingByDate = true;

  constructor(
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService
  ) { }

  public ngOnInit(): void {
    // this.sortroomsAsPerDate();
    setTimeout(() => this.loader = false, 200);
  }

  // public sortroomsAsPerDate(): any {
  //   this.isDescendingByDate
  //   ? this.bookingsVc.sort((a, b) => +new Date (b.date.toString()) - +new Date (a.date.toString()))
  //   : this.bookingsVc.sort((a, b) => +new Date (a.date.toString()) - +new Date (b.date.toString()));
  //   this.isDescendingByDate = !this.isDescendingByDate;
  // }

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
