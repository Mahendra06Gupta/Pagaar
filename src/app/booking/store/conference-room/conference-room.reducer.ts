import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as moment from 'moment';

import {
    INIT_CONFERENCE,
    UPDATE_CONFERENCE_STATUS_VC,
    CLEAR_CONFERENCE,
    UPDATE_BOOKED_CONFERENCE_ROOM,
    UPDATE_SELECTED_BOOKING_DATE,
    ConferenceActions
} from './conference-room.actions';
import { ConferenceRoomOverviewModel } from '@app/booking/models/conference-overview/conference-room-overview.model';

export interface ConferenceState extends EntityState<ConferenceRoomOverviewModel> {
    initiated: boolean;
    selectedDate: moment.Moment;
}

export const conferenceAdapter: EntityAdapter<ConferenceRoomOverviewModel> = createEntityAdapter<ConferenceRoomOverviewModel>({
    selectId: booking => booking.bookingId
});

export const INITIAL_CONFERENCE_STATE: ConferenceState = conferenceAdapter.getInitialState({
    initiated: false,
    selectedDate: moment()
});

export function conferenceReducer(state: ConferenceState = INITIAL_CONFERENCE_STATE, action: ConferenceActions): ConferenceState {
    switch (action.type) {
        case INIT_CONFERENCE:
            return conferenceAdapter.addAll(action.payload, {
                ...state,
                initiated: true,
                selectedDate: moment()
            });
        case UPDATE_CONFERENCE_STATUS_VC:
            return conferenceAdapter.updateOne(
                {
                    id: action.payload.bookingId,
                    changes: {
                        ...state.entities[action.payload.bookingId],
                        status: 'Cancelled'
                    }
                },
                state
            );
        case UPDATE_SELECTED_BOOKING_DATE:
            return {
                ...state,
                selectedDate: action.payload
            };
        case UPDATE_BOOKED_CONFERENCE_ROOM:
            const {
                roomName,
                roomId,
                date,
                bookedBy,
                slot,
                status,
                bookingId,
            } = action.payload;
            return conferenceAdapter.addOne({
                roomName,
                roomId,
                date,
                bookedBy,
                slot,
                status,
                bookingId,
            }, state);
        case CLEAR_CONFERENCE:
            return INITIAL_CONFERENCE_STATE;
        default:
            return state;
    }
}
