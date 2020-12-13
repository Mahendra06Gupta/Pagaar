import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '@app/store/models/root-state.model';
import { ActionModalComponent } from '@app/shared/components/action-modal';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { VcModel } from '@app/booking/models/conference-overview/conference-room-overview.model';

@Component({
  selector: 'app-vcid-list-expandable-tab',
  templateUrl: './vcId-list-expandable-tab.component.html',
  styleUrls: ['./vcId-list-expandable-tab.component.scss']
})
export class VcIdListExpandableTabComponent implements OnInit {

  displayedColumns: string[] = ['roomName', 'roomId', 'roomAddedOn', 'createdBy'];
  @Input() public createdVc: VcModel[];
  public loader = true;
  public isDescendingByDate = true;

  constructor(
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService
  ) { }

  public ngOnInit(): void {
    this.sortVcsAsPerDate();
    setTimeout(() => this.loader = false, 200);
  }

  public sortVcsAsPerDate(): any {
    this.isDescendingByDate
    ? this.createdVc.sort((a, b) => +new Date (b.roomAddedOn.toString()) - +new Date (a.roomAddedOn.toString()))
    : this.createdVc.sort((a, b) => +new Date (a.roomAddedOn.toString()) - +new Date (b.roomAddedOn.toString()));
    this.isDescendingByDate = !this.isDescendingByDate;
  }

}
