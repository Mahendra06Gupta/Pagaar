import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookingAdapter } from './individual-booked-vc-room.reducer';
import { BookingsState } from '../models/booking-state.model';
import * as fromBookingModel from '@app/booking/models/room-overview/individual-room-overview.model';

const getBookingVcState = createFeatureSelector<BookingsState>('booking');

const getBookingState = createSelector(
    getBookingVcState,
    (state: BookingsState) => state && state.individualBookingRoom
);

const {
    selectAll,
} = bookingAdapter.getSelectors(getBookingState);

export const getBookingEntities = selectAll;

export const getNoOfCancelledAndBookedRoom = createSelector(
    getBookingEntities,
    (booking: fromBookingModel.IndividualRoomOverviewModel[]) => fromBookingModel.getNoOfCancelBooking(booking)
);

