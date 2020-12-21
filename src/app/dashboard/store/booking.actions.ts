import { Action } from '@ngrx/store';
import { LoadedBookingsData } from '../models/loaded-bookings-data.model';

export const INIT_BOOKING_AND_CONFERENCE = '[BOOKINGS] INIT_BOOKING_AND_CONFERENCE';
export const CLEAR_BOOKING_AND_CONFERENCE = '[BOOKINGS] CLEAR_BOOKING_AND_CONFERENCE';

export class InitBookingAndconference implements Action {
    public readonly type = INIT_BOOKING_AND_CONFERENCE;

    constructor(public readonly payload: LoadedBookingsData) {
    }
}

export class ClearBookingAndConference implements Action {
    public readonly type = CLEAR_BOOKING_AND_CONFERENCE;
}

export type BookingsActions =
    InitBookingAndconference
    | ClearBookingAndConference;
