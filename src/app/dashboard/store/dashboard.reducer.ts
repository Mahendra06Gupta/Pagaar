// import { DashboardsState } from './models/dashboard-state.model';
// import { INIT_BOOKING_AND_CONFERENCE, CLEAR_BOOKING_AND_CONFERENCE, BookingsActions } from './dashboard.actions';

export function getSavedState(localStoreKey: string): any {
    return JSON.parse(localStorage.getItem(localStoreKey));
}

export const localStorageKey = '__app_storage__';

// export function bookingsMetaReducer(reducer): (state: DashboardsState, action: BookingsActions) => DashboardsState {
//     return function crossBookingsStoreReducer(state: DashboardsState, action: BookingsActions): DashboardsState {
//         switch (action.type) {
//             case INIT_BOOKING_AND_CONFERENCE:
//                 return {
//                     ...state,
//                     individualBookingRoom: fromBookingVcReducer.bookingVcReducer(
//                         state.individualBookingRoom, new InitIndividualBookingVc(action.payload.booking)
//                     ),
//                     allConferenceDetail: fromConferenceReducer.conferenceReducer(
//                         state.allConferenceDetail, new InitConference(action.payload.conference)
//                     ),
//                     allConferenceRoom: fromConferenceAddingReducer.conferenceAddingReducer(
//                         state.allConferenceRoom, new InitConferenceRoom(action.payload.conferenceRoom)
//                     )
//                 };
//             case CLEAR_BOOKING_AND_CONFERENCE:
//                 return {
//                     ...state,
//                     individualBookingRoom: fromBookingVcReducer.bookingVcReducer(
//                         state.individualBookingRoom, new ClearInidividualBookingsVc()
//                     ),
//                     allConferenceDetail: fromConferenceReducer.conferenceReducer(
//                         state.allConferenceDetail, new ClearConference()
//                     ),
//                     allConferenceRoom: fromConferenceAddingReducer.conferenceAddingReducer(
//                         state.allConferenceRoom, new ClearConferenceRoom()
//                     )
//                 };
//             default:
//             return reducer(state, action);
//         }
//     };
// }
