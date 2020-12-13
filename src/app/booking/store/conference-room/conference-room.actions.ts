import { Action } from '@ngrx/store';
import { ConferenceRoomOverviewModel } from '@app/booking/models/conference-overview/conference-room-overview.model';
import { Moment } from 'moment';

export const INIT_CONFERENCE = '[CONFERENCE] INIT_CONFERENCE';
export const UPDATE_BOOKED_CONFERENCE_ROOM = '[CONFERENCE] UPDATE_BOOKED_CONFERENCE_ROOM';
export const UPDATE_SELECTED_BOOKING_DATE = '[CONFERENCE] UPDATE_SELECTED_BOOKING_DATE';
export const UPDATE_CONFERENCE_STATUS_VC = '[CONFERENCE] UPDATE_CONFERENCE_STATUS_VC';
export const CLEAR_CONFERENCE = '[CONFERENCE] CLEAR_CONFERENCE';

export class InitConference implements Action {
    public readonly type = INIT_CONFERENCE;

    constructor(public payload: ConferenceRoomOverviewModel[]) {
    }
}

export class UpdateBookedConferenceRoom implements Action {
    public readonly type = UPDATE_BOOKED_CONFERENCE_ROOM;

    constructor(public payload: ConferenceRoomOverviewModel) {
    }
}

export class UpdateSelectedBookingDate implements Action {
    public readonly type = UPDATE_SELECTED_BOOKING_DATE;

    constructor(public payload: Moment) {
    }

}

export class UpdateConferenceStatus implements Action {
    public readonly type = UPDATE_CONFERENCE_STATUS_VC;

    constructor(public payload: {bookingId: string}) {
    }
}

export class ClearConference implements Action {
    public readonly type = CLEAR_CONFERENCE;
}

export type ConferenceActions =
    InitConference |
    UpdateBookedConferenceRoom |
    UpdateSelectedBookingDate |
    UpdateConferenceStatus |
    ClearConference ;
