import { ActionReducerMap, combineReducers, compose } from '@ngrx/store';

// import { bookingsMetaReducer } from '@app/dashboard/store/dashboard.reducer';
// import { DashboardsState } from '@app/dashboard/store/models/dashboard-state.model';

// export const BOOKINGS_STORE_REDUCERS: ActionReducerMap<DashboardsState> = {
    // individualBookingRoom: fromBookingVcReducer.bookingVcReducer,
    // allConferenceDetail: fromConferenceReducer.conferenceReducer,
    // allConferenceRoom: fromConferenceAddingReducer.conferenceAddingReducer
// };

// export function BOOKINGS_REDUCERS(state: any, action: any): DashboardsState {
//     return compose(bookingsMetaReducer, combineReducers)(BOOKINGS_STORE_REDUCERS)(state, action);
// }

export const BOOKINGS_EFFECTS = [];

// export const fromBookingsSelectors: typeof bookingVcSelectors & typeof conferenceSelector & typeof conferenceRoomSelector = {
//     ...bookingVcSelectors,
//     ...conferenceSelector,
//     ...conferenceRoomSelector
// };
