import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, first } from 'rxjs/operators';

import { RootState } from '@app/store';
import { InitBookingAndconference } from '@app/dashboard/store';
import * as fromDummyDataSet from '@app/dashboard/dummy-data-set/dummy-data-set';
import * as fromUserDetailsSelector from '@app/store/user-details/user-details.selectors';
import { fromBookingsSelectors } from '@app/dashboard/store/store';
import { getSavedState, localStorageKey } from '@app/dashboard/store/booking.reducer';

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrls: ['./conference-list.component.scss']
})
export class ConferenceListComponent implements OnInit {

  public loading = true;
  public bookedConference$ = this.store$.select(fromBookingsSelectors.getConferenceEntities);
  public createdVc$ = this.store$.select(fromBookingsSelectors.getConferenceRoomEntities);
  public noOfCancelAndBookedConference$ = this.store$.select(fromBookingsSelectors.getNoOfCancelledAndCancelledRoom);
  public pageTitle = {
    title: 'Conference Booking Dashboard',
    subTitle: 'Add a new conference room for booking or viewed the upcoming and past conferences of all user.',
    newButton: 'Add Conference',
    statistics: 'Conference Statistic(s)',
    totalTitle: 'Total Conference(s) Booked',
    bookedTitle: 'Total Conference(s) Active',
    cancelTitle: 'Total Conference(s) Cancelled'
  };
  public isAnyRoomBooked = false;
  constructor(public readonly store$: Store<RootState>) { }

  public ngOnInit(): void {

    setTimeout(() =>
      this.loading = false
    , 2000);

  }
}
