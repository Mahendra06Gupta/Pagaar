import { EmployersDetail } from '@app/employer-profile/models/employer-detail.model';
import { Action } from '@ngrx/store';

export const ADD_EMPLOYER_DETAILS = '[EMPLOYERS] ADD_EMPLOYER_DETAILS';
export const UPDATE_EMPLOYEE_DETAILS = '[EMPLOYERS] UPDATE_EMPLOYER_DETAILS';

export class AddEmployerDetails implements Action {
    public readonly type = ADD_EMPLOYER_DETAILS;

    constructor(public payload: EmployersDetail[]) {
    }
}

export type EmployerActions =
    AddEmployerDetails;
