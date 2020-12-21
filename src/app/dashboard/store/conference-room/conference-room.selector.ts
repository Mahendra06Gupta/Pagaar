import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Moment } from 'moment';

import { conferenceAdapter, ConferenceState } from './conference-room.reducer';
import { BookingsState } from '../models/booking-state.model';
import * as fromConferenceModel from '@app/dashboard/models/conference-overview/conference-room-overview.model';

const getConferenceDetailState = createFeatureSelector<BookingsState>('booking');

const getConferenceState = createSelector(
    getConferenceDetailState,
    (state: BookingsState) => state && state.allConferenceDetail
);

const {
    selectAll,
} = conferenceAdapter.getSelectors(getConferenceState);

export const getConferenceEntities = selectAll;

export const getBookingDate = createSelector(
    getConferenceState,
    (state: ConferenceState) => state  && state.selectedDate
);

export const getConferenceForAParticularDate = createSelector(
    getConferenceEntities,
    getBookingDate,
    (conference, date: Moment) => fromConferenceModel.getConferenceForAParticularDate(conference, date)
);

export const getNoOfCancelledAndCancelledRoom = createSelector(
    getConferenceEntities,
    (conference: fromConferenceModel.ConferenceRoomOverviewModel[]) => fromConferenceModel.getNoOfCancelConference(conference)
);

