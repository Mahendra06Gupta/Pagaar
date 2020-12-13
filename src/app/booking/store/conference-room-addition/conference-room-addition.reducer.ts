import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as moment from 'moment';

import {
    INIT_CONFERENCE,
    NEW_CONFERENCE_ADDED,
    CLEAR_CONFERENCE_ROOM,
    ConferenceAddingActions
} from './conference-room-addition.actions';
import { VcModel } from '@app/booking/models/conference-overview/conference-room-overview.model';

export interface ConferenceAddingState extends EntityState<VcModel> {
    initiated: boolean;
}

export const conferenceAddingAdapter: EntityAdapter<VcModel> = createEntityAdapter<VcModel>({
    selectId: booking => booking.roomId
});

export const INITIAL_CONFERENCE_STATE: ConferenceAddingState = conferenceAddingAdapter.getInitialState({
    initiated: false
});

export function conferenceAddingReducer(state: ConferenceAddingState = INITIAL_CONFERENCE_STATE, action: ConferenceAddingActions): ConferenceAddingState {
    switch (action.type) {
        case INIT_CONFERENCE:
            return conferenceAddingAdapter.addAll(action.payload, {
                ...state,
                initiated: true
            });
            case NEW_CONFERENCE_ADDED:
                const {
                    roomName,
                    roomId,
                    createdBy,
                    roomAddedOn
                } = action.payload;
                return conferenceAddingAdapter.addOne({
                    roomName,
                    roomId,
                    createdBy,
                    roomAddedOn
                }, state);
        case CLEAR_CONFERENCE_ROOM:
            return INITIAL_CONFERENCE_STATE;
        default:
            return state;
    }
}
