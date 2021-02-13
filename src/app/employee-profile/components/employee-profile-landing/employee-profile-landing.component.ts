import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, first } from 'rxjs/operators';

import { RootState } from '@app/store';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';
import { EmployeeProfileTab } from '@app/employee-profile/models/employee-profile-routing.path';

@Component({
  selector: 'app-employee-profile-landing',
  templateUrl: './employee-profile-landing.component.html',
  styleUrls: ['./employee-profile-landing.component.scss']
})
export class EmployeeProfileLandingComponent implements OnInit {

  public userEmail: string;
  public userNameAbv: string;
  public employeeProfileTab = EmployeeProfileTab;

  constructor(
    public readonly store$: Store<RootState>
  ) {}

  public ngOnInit(): void {
    this.store$.select(fromUserDetailsSelector.getUserLoggedInEmail).pipe(
      first(),
      tap((email) => {
        this.userEmail = email;
        const emailSplit = email.split('');
        this.userNameAbv = `${emailSplit[0]}${emailSplit[1]}`;
      })
    ).subscribe();
  }
}
