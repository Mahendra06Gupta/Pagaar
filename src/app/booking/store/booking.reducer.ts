import { BookingsState } from './models/booking-state.model';
import { INIT_BOOKING_AND_CONFERENCE, CLEAR_BOOKING_AND_CONFERENCE, BookingsActions } from './booking.actions';
import * as fromBookingVcReducer from './individual-booked-vc-room/individual-booked-vc-room.reducer';
import * as fromConferenceReducer from './conference-room/conference-room.reducer';
import * as fromConferenceAddingReducer from './conference-room-addition/conference-room-addition.reducer';
import { InitIndividualBookingVc, ClearInidividualBookingsVc } from './individual-booked-vc-room/individual-booked-vc-room.actions';
import { InitConference, ClearConference } from './conference-room/conference-room.actions';
import { InitConferenceRoom, ClearConferenceRoom } from './conference-room-addition/conference-room-addition.actions';

export function getSavedState(localStoreKey: string): any {
    return JSON.parse(localStorage.getItem(localStoreKey));
}

export const localStorageKey = '__app_storage__';

export function bookingsMetaReducer(reducer): (state: BookingsState, action: BookingsActions) => BookingsState {
    return function crossBookingsStoreReducer(state: BookingsState, action: BookingsActions): BookingsState {
        switch (action.type) {
            case INIT_BOOKING_AND_CONFERENCE:
                return {
                    ...state,
                    individualBookingRoom: fromBookingVcReducer.bookingVcReducer(
                        state.individualBookingRoom, new InitIndividualBookingVc(action.payload.booking)
                    ),
                    allConferenceDetail: fromConferenceReducer.conferenceReducer(
                        state.allConferenceDetail, new InitConference(action.payload.conference)
                    ),
                    allConferenceRoom: fromConferenceAddingReducer.conferenceAddingReducer(
                        state.allConferenceRoom, new InitConferenceRoom(action.payload.conferenceRoom)
                    )
                };
            case CLEAR_BOOKING_AND_CONFERENCE:
                return {
                    ...state,
                    individualBookingRoom: fromBookingVcReducer.bookingVcReducer(
                        state.individualBookingRoom, new ClearInidividualBookingsVc()
                    ),
                    allConferenceDetail: fromConferenceReducer.conferenceReducer(
                        state.allConferenceDetail, new ClearConference()
                    ),
                    allConferenceRoom: fromConferenceAddingReducer.conferenceAddingReducer(
                        state.allConferenceRoom, new ClearConferenceRoom()
                    )
                };
            default:
            return reducer(state, action);
        }
    };
}
