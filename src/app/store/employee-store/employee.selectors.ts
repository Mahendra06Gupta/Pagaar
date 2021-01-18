import { EmployeeDetailApiReuestModel } from '@app/employee-profile/models/employee-detail.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { employeeAdapter, EmployeeState } from './employee.reducer';

const getEmployeeDetailsState = createFeatureSelector<EmployeeState>('employee');

const getUserState = createSelector(
    getEmployeeDetailsState,
    (state: EmployeeState) => state
);

const {
    selectAll,
} = employeeAdapter.getSelectors(getUserState);

export const getEmployeeEntities = selectAll;

export const getEmployeeDetails = createSelector(
    getEmployeeDetailsState,
    (state: EmployeeState) => state && state.entities[0]
);

export const getEmployeeID = createSelector(
    getEmployeeDetails,
    state => state && state.id
);
