import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Moment } from 'moment';

import { conferenceAddingAdapter, ConferenceAddingState } from './conference-room-addition.reducer';
import { BookingsState } from '../models/booking-state.model';
import * as fromConferenceModel from '@app/dashboard/models/conference-overview/conference-room-overview.model';

const getConferenceRoomsState = createFeatureSelector<BookingsState>('booking');

const getConferenceRoomState = createSelector(
    getConferenceRoomsState,
    (state: BookingsState) => state && state.allConferenceRoom
);

const {
    selectAll,
} = conferenceAddingAdapter.getSelectors(getConferenceRoomState);

export const getConferenceRoomEntities = selectAll;
