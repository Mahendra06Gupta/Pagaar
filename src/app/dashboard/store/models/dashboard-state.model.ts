import { BookingVcState } from '@app/dashboard/store/individual-booked-vc-room/individual-booked-vc-room.reducer';
import { ConferenceState } from '@app/dashboard/store/conference-room/conference-room.reducer';
import { ConferenceAddingState } from '../conference-room-addition/conference-room-addition.reducer';

export interface DashboardsState {
    individualBookingRoom: BookingVcState;
    allConferenceDetail: ConferenceState;
    allConferenceRoom?: ConferenceAddingState;
}
