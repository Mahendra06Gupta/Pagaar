// import { ActionReducerMap, combineReducers, compose } from '@ngrx/store';

// import * as bookingVcSelectors from '@app/dashboard/store/individual-booked-vc-room/individual-booked-vc-room.selector';
// import * as conferenceSelector from '@app/dashboard/store/conference-room/conference-room.selector';
// import * as conferenceRoomSelector from '@app/dashboard/store/conference-room-addition/conference-room-addition.selector';
// import * as fromBookingVcReducer from '@app/dashboard/store/individual-booked-vc-room/individual-booked-vc-room.reducer';
// import * as fromConferenceReducer from '@app/dashboard/store/conference-room/conference-room.reducer';
// import * as fromConferenceAddingReducer from './conference-room-addition/conference-room-addition.reducer';
// import { bookingsMetaReducer } from '@app/dashboard/store/dashboard.reducer';
// import { DashboardsState } from '@app/dashboard/store/models/dashboard-state.model';

// export const BOOKINGS_STORE_REDUCERS: ActionReducerMap<DashboardsState> = {
//     individualBookingRoom: fromBookingVcReducer.bookingVcReducer,
//     allConferenceDetail: fromConferenceReducer.conferenceReducer,
//     allConferenceRoom: fromConferenceAddingReducer.conferenceAddingReducer
// };

// export function BOOKINGS_REDUCERS(state: any, action: any): DashboardsState {
//     return compose(bookingsMetaReducer, combineReducers)(BOOKINGS_STORE_REDUCERS)(state, action);
// }

// export const BOOKINGS_EFFECTS = [];

// export const fromBookingsSelectors: typeof bookingVcSelectors & typeof conferenceSelector & typeof conferenceRoomSelector = {
//     ...bookingVcSelectors,
//     ...conferenceSelector,
//     ...conferenceRoomSelector
// };
