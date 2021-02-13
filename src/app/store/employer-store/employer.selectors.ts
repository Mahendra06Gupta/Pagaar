import * as fromEmployersModel from '@app/employer-profile/models/employer-detail.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getUserLoggedInEmail } from '../user-details/user-details.selectors';
import { employerAdapter, EmployerState } from './employer.reducer';

const getEmployerDetailsState = createFeatureSelector<EmployerState>('employer');

const getEmployerState = createSelector(
    getEmployerDetailsState,
    (state: EmployerState) => state
);

const {
    selectAll,
} = employerAdapter.getSelectors(getEmployerState);

export const getEmployerEntities = selectAll;

export const getEmployerDetails = createSelector(
    getEmployerDetailsState,
    (state: EmployerState) => state && state.entities
);

export const getLoggedInEmployerData = createSelector(
    getEmployerEntities,
    getUserLoggedInEmail,
    (state: fromEmployersModel.EmployersDetail[], email) => state && fromEmployersModel.getEmployer(state, email)
);

export const getLoggedInEmployerId = createSelector(
    getLoggedInEmployerData,
    (employersDetail: fromEmployersModel.EmployersDetail) => employersDetail?.id
);

export const getEmployerIds = createSelector(
    getEmployerDetailsState,
    (state: EmployerState) => state && state.ids[0]
);
