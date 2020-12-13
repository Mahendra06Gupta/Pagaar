import { ActionReducerMap, combineReducers, compose } from '@ngrx/store';

import * as bookingVcSelectors from '@app/booking/store/individual-booked-vc-room/individual-booked-vc-room.selector';
import * as conferenceSelector from '@app/booking/store/conference-room/conference-room.selector';
import * as conferenceRoomSelector from '@app/booking/store/conference-room-addition/conference-room-addition.selector';
import * as fromBookingVcReducer from '@app/booking/store/individual-booked-vc-room/individual-booked-vc-room.reducer';
import * as fromConferenceReducer from '@app/booking/store/conference-room/conference-room.reducer';
import * as fromConferenceAddingReducer from './conference-room-addition/conference-room-addition.reducer';
import { bookingsMetaReducer } from '@app/booking/store/booking.reducer';
import { BookingsState } from '@app/booking/store/models/booking-state.model';

export const BOOKINGS_STORE_REDUCERS: ActionReducerMap<BookingsState> = {
    individualBookingRoom: fromBookingVcReducer.bookingVcReducer,
    allConferenceDetail: fromConferenceReducer.conferenceReducer,
    allConferenceRoom: fromConferenceAddingReducer.conferenceAddingReducer
};

export function BOOKINGS_REDUCERS(state: any, action: any): BookingsState {
    return compose(bookingsMetaReducer, combineReducers)(BOOKINGS_STORE_REDUCERS)(state, action);
}

export const BOOKINGS_EFFECTS = [];

export const fromBookingsSelectors: typeof bookingVcSelectors & typeof conferenceSelector & typeof conferenceRoomSelector = {
    ...bookingVcSelectors,
    ...conferenceSelector,
    ...conferenceRoomSelector
};
