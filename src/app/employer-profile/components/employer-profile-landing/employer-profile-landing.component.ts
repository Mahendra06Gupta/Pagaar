import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, first } from 'rxjs/operators';

import { RootState } from '@app/store';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';
import { EmployerProfileTab } from '@app/employer-profile/models/employer-profile-routing.path';

@Component({
  selector: 'app-employer-profile-landing',
  templateUrl: './employer-profile-landing.component.html',
  styleUrls: ['./employer-profile-landing.component.scss']
})
export class EmployerProfileLandingComponent implements OnInit {

  public userEmail: string;
  public userNameAbv: string;
  public employerProfileTab = EmployerProfileTab;

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
