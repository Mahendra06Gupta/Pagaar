import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getUserLoggedInEmail } from '../user-details/user-details.selectors';
import { employerAdapter, EmployerState } from './employer.reducer';

const getEmployerDetailsState = createFeatureSelector<EmployerState>('employer');

const getEmployerState = createSelector(
    getEmployerDetailsState,
    (state: EmployerState) => state
);

const {
    selectEntities,
    selectAll,
} = employerAdapter.getSelectors(getEmployerState);

export const getEmployerEntities = selectAll;

export const getEmployerDetails = createSelector(
    getEmployerDetailsState,
    (state: EmployerState) => state && state.entities
);

export const getEmployerIds = createSelector(
    getEmployerDetailsState,
    (state: EmployerState) => state && state.ids[0]
);
