import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { EmployeesDetail } from '@app/employee-profile/models/employee-detail.model';
import { ADD_EMPLOYEE_DETAILS, EmployeeActions } from './employee.actions';

export interface EmployeeState extends EntityState<EmployeesDetail> {
    initiated: boolean;
}

export const employeeAdapter: EntityAdapter<EmployeesDetail> = createEntityAdapter<EmployeesDetail>({
    selectId: employee => employee.id
});

export const INITIAL_EMPLOYEE_STATE: EmployeeState = employeeAdapter.getInitialState({
    initiated: false,
});

export function EmployeeReducer(state: EmployeeState = INITIAL_EMPLOYEE_STATE, action: EmployeeActions): EmployeeState {
    switch (action.type) {
        case ADD_EMPLOYEE_DETAILS:
            return employeeAdapter.setAll(action.payload, {
                ...state,
                initiated: true
            });
        default:
            return state;
    }
}
