import { BookingVcState } from '@app/booking/store/individual-booked-vc-room/individual-booked-vc-room.reducer';
import { ConferenceState } from '@app/booking/store/conference-room/conference-room.reducer';
import { ConferenceAddingState } from '../conference-room-addition/conference-room-addition.reducer';

export interface BookingsState {
    individualBookingRoom: BookingVcState;
    allConferenceDetail: ConferenceState;
    allConferenceRoom: ConferenceAddingState;
}
