import { Component, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { RootState } from '@app/store/models/root-state.model';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { EmployersDetail } from '@app/employer-profile/models/employer-detail.model';
import { UpdateApplicationId } from '@app/store';
import { GoToApplicationListing } from '@app/job-application-list/job-application-list-routing.actions';
import { isLoggedInUserSuperAdmin } from '@app/models/data.model';

@Component({
  selector: 'app-employer-list-tab',
  templateUrl: './employer-list-tab.component.html',
  styleUrls: ['./employer-list-tab.component.scss']
})
export class EmployerListTabComponent implements OnChanges {

  @Input() public employerList: EmployersDetail[];
  @Output() public employerSelected = new EventEmitter<EmployersDetail>();
  @Output() public pageChange = new EventEmitter<any>();
  public isLoggedInUserSuperAdmin = isLoggedInUserSuperAdmin();
  public loader = true;
  public isDescendingByDate = true;
  public dataSource: MatTableDataSource<EmployersDetail>;

  public columnDefinitions = [
    { def: 'companyName', show: true },
    { def: 'companySize', show: true },
    { def: 'businessNature', show: true },
    { def: 'email', show: true },
    { def: 'phoneNumber', show: true },
    { def: 'country', show: true },
    { def: 'pincode', show: true },
    { def: 'action', show: this.isLoggedInUserSuperAdmin }
  ];

  constructor(
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.employerList);
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

  public onPageChange(event): any {
    this.pageChange.emit(event);
  }

  public GoToApplicationList(employerId: string): void {
    this.store$.dispatch(new UpdateApplicationId({updateApplicationId: employerId, mode: 'employerId'}));
    this.store$.dispatch(new GoToApplicationListing());
  }

}
