import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { DashboardSearchFormComponent } from '../../../dashboard/components/dashboard-search-form/dashboard-search-form.component';
// import { ConferenceFormComponent } from '@app/dashboard/components/conference/components/conference-form/conference-form.component';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  @Input() count: {totalBooking: number, noOfActive: number, noOfCancel: number};
  @Input() pageTitle:
  {
    title: string,
    subTitle: string,
    newButton: string,
    statistics: string,
    totalTitle: string,
    bookedTitle: string,
    cancelTitle: string
  };
  @Input() createRoom: boolean;

  constructor(private readonly dialogService: DialogService) { }

  public ngOnInit(): void {
  }

  public bookRoom(): void {
    // this.createRoom ? this.dialogService.openDialog(DashboardSearchFormComponent, {}) : this.dialogService.openDialog(ConferenceFormComponent, {});
  }

}
