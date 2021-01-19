import { EmployeesDetail } from '@app/employee-profile/models/employee-detail.model';
import { Action } from '@ngrx/store';

export const ADD_EMPLOYEE_DETAILS = '[EMPLOYEES] ADD_EMPLOYEE_DETAILS';
export const UPDATE_EMPLOYEE_DETAILS = '[EMPLOYEES] UPDATE_EMPLOYEE_DETAILS';

export class AddEmployeeDetails implements Action {
    public readonly type = ADD_EMPLOYEE_DETAILS;

    constructor(public payload: EmployeesDetail[]) {
    }
}

export type EmployeeActions =
    AddEmployeeDetails;
