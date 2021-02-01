import { createFeatureSelector, createSelector } from '@ngrx/store';
import { employeeAdapter, EmployeeState } from './employee.reducer';

const getEmployeeDetailsState = createFeatureSelector<EmployeeState>('employee');

const getEmployeeState = createSelector(
    getEmployeeDetailsState,
    (state: EmployeeState) => state
);

const {
    selectAll,
} = employeeAdapter.getSelectors(getEmployeeState);

export const getEmployeeEntities = selectAll;

export const getEmployeeDetails = createSelector(
    getEmployeeDetailsState,
    (state: EmployeeState) => state && state.entities
);

export const getEmployeeID = createSelector(
    getEmployeeDetailsState,
    state => state && state.ids[0]
);
