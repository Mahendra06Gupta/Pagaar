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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {}

  public ngOnInit(): void {
  }

  // public loading = true;
  // public bookedVc$ = this.store$.select(fromBookingsSelectors.getBookingEntities);
  // public noOfCancelAndBookedRoom$ = this.store$.select(fromBookingsSelectors.getNoOfCancelledAndBookedRoom);
  // public isBookingEntityEmpty =
  //   getSavedState(localStorageKey).booking &&
  //   getSavedState(localStorageKey).booking.individualBookingRoom &&
  //   getSavedState(localStorageKey).booking.individualBookingRoom.ids &&
  //   getSavedState(localStorageKey).booking.individualBookingRoom.ids.length === 0;
  // public pageTitle = {
  //   title: 'Room Booking Dashboard',
  //   subTitle: 'Book a new conference or viewed the upcoming and past booking',
  //   newButton: 'Create Room',
  //   statistics: 'Booking Statistic(s)',
  //   totalTitle: 'Total Room(s) Booked',
  //   bookedTitle: 'Total Room(s) Active',
  //   cancelTitle: 'Total Room(s) Cancelled'
  // };
  // public isAnyRoomBooked = false;

  // constructor(public readonly store$: Store<RootState>) { }

  // public ngOnInit(): void {
  //   setTimeout(() => {
  //     if (this.isBookingEntityEmpty) {
  //       this.store$.select(fromUserDetailsSelector.getUserLoggedInName).pipe(
  //         first(),
  //         tap(data => {
  //           const booking = fromDummyDataSet[data].booking;
  //           const conference = fromDummyDataSet.presentRoomId.conference;
  //           const conferenceRoom = fromDummyDataSet.VcIdAvailable;
  //           this.store$.dispatch(new InitBookingAndconference({booking, conference, conferenceRoom}));
  //         })
  //       ).subscribe();
  //     }
  //     this.loading = false;
  //   }, 2000);

  // }

}
