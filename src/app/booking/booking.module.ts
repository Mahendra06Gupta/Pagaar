import { NgModule } from '@angular/core';
import { SharedAppModule } from '../shared';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import * as fromBookingStore from '../booking/store/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookingRoutingModule } from './booking-routing.module';

@NgModule({
  declarations: [
    BookingListComponent,
  ],
  imports: [
    SharedAppModule,
    BookingRoutingModule,
    EffectsModule.forFeature(fromBookingStore.BOOKINGS_EFFECTS),
    StoreModule.forFeature('booking', fromBookingStore.BOOKINGS_REDUCERS)
  ]
})
export class BookingModule { }
