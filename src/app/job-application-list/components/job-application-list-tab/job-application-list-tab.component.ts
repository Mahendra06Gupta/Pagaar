import { Component, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RootState } from '@app/store/models/root-state.model';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { EmployerApiService } from '@app/employer-profile/services/employer-api.service';
import { isLoggedInUserSuperAdmin } from '@app/models/data.model';
import { JobApplicationListItem } from '@app/job-application-list/models/job-application-detail.model';
import { EmployeeDetailsModalComponent, EmployerDetailsModalComponent, PostedJobDetailsModalComponent } from '@app/shared/popups';
import { ApiService } from '@app/employee-profile/services/api.service';
import { JobPostingApiService } from '@app/job-posting/services/job-posting-api.service';
import { dummyDataForEmployerById } from '@app/job-application-list/models/dummy-data-set';

@Component({
  selector: 'app-job-application-list-tab',
  templateUrl: './job-application-list-tab.component.html',
  styleUrls: ['./job-application-list-tab.component.scss']
})
export class JobApplicationListTabComponent implements OnChanges {

  @Input() public jobApplicationList: JobApplicationListItem[];
  @Output() public applicationSelected = new EventEmitter<JobApplicationListItem>();
  @Output() public pageChange = new EventEmitter<any>();
  public loader = true;
  public isDescendingByDate = true;
  public dataSource: MatTableDataSource<JobApplicationListItem>;
  public isLoggedInUserSuperAdmin = isLoggedInUserSuperAdmin();

  public columnDefinitions = [
    { def: 'companyNmae', show: true },
    { def: 'employee', show: true },
    { def: 'jobTitle', show: true },
    { def: 'applicationDate', show: true },
  ];

  constructor(
    private readonly toastrService: ToastrService,
    private readonly dialogService: DialogService,
    private readonly employerApiService: EmployerApiService,
    private readonly employeeApiService: ApiService,
    private readonly jobPostingApiService: JobPostingApiService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.jobApplicationList);
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

  public getDetailByAction(mode: string, id: string) {
    switch (mode) {
      case 'employer':
        this.getDetail(
          this.employerApiService.getEmployerDetailById(id),
          EmployerDetailsModalComponent
        );
        break;
      case 'employee':
        this.getDetail(
          this.employeeApiService.getEmployeeDetailById(id),
          EmployeeDetailsModalComponent
        );
        break;
      case 'job':
        this.getDetail(
          this.jobPostingApiService.getJobDetailById(id),
          PostedJobDetailsModalComponent
        );
        break;
    }
  }

  private getDetail(api: Observable<any>, component: any) {
    api.pipe(
      first(),
      tap((res) => res ? this.dialogService.openDialog(component, {
        res
      }) : this.toastrService.warning('No Details Found'))
    ).subscribe();
  }

}
