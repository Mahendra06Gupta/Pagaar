import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { IndividualRoomOverviewModel } from '@app/dashboard/models/room-overview/individual-room-overview.model';
import { RootState } from '@app/store/models/root-state.model';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';

@Component({
  selector: 'app-booking-list-tab',
  templateUrl: './booking-list-tab.component.html',
  styleUrls: ['./booking-list-tab.component.scss']
})
export class BookingListTabComponent implements OnInit {

  @Input() public bookingsVc: IndividualRoomOverviewModel[];
  @Input() public showCancel: boolean;
  public loader = true;
  public isDescendingByDate = true;
  public dataSource: MatTableDataSource<IndividualRoomOverviewModel>;

  public columnDefinitions = [
    { def: 'roomName', show: true },
    { def: 'roomId', show: true },
    { def: 'date', show: true },
    { def: 'bookedBy', show: true },
    { def: 'slot', show: true },
    { def: 'status', show: true },
    { def: 'bookingId', show: true },
    // { def: 'action', show: this.showCancel },
  ];

  constructor(
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.bookingsVc);
    this.sortroomsAsPerDate();
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
      .filter(cd => cd.show || this.showCancel)
      .map(cd => cd.def);
  }

  public sortroomsAsPerDate(): any {
    this.isDescendingByDate
    ? this.bookingsVc.sort((a, b) => +new Date (b.date.toString()) - +new Date (a.date.toString()))
    : this.bookingsVc.sort((a, b) => +new Date (a.date.toString()) - +new Date (b.date.toString()));
    this.isDescendingByDate = !this.isDescendingByDate;
    this.dataSource = new MatTableDataSource(this.bookingsVc);
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
