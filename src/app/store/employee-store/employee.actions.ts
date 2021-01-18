import { EmployeeDetailApiReuestModel } from '@app/employee-profile/models/employee-detail.model';
import { Action } from '@ngrx/store';
// import { EmployeeDetailApiReuestModel } from '../../models/room-overview/individual-room-overview.model';

export const ADD_EMPLOYEE_DETAILS = '[EMPLOYEES] ADD_EMPLOYEE_DETAILS';
// export const ADD_EMPLOYEE_DETAILS = '[EMPLOYEES] ADD_EMPLOYEE_DETAILS';
export const UPDATE_EMPLOYEE_DETAILS = '[EMPLOYEES] UPDATE_EMPLOYEE_DETAILS';

export class AddEmployeeDetails implements Action {
    public readonly type = ADD_EMPLOYEE_DETAILS;

    constructor(public payload: EmployeeDetailApiReuestModel[]) {
    }
}

// export class AddEmployeeDetail implements Action {
//     public readonly type = ADD_EMPLOYEE_DETAILS;

//     constructor(public payload: IndividualRoomOverviewModel) {
//     }
// }

// export class UpdateIndividualBookingVcStatus implements Action {
//     public readonly type = UPDATE_EMPLOYEE_DETAILS;

//     constructor(public payload: {bookingId: string}) {
//     }
// }

// export class ClearInidividualBookingsVc implements Action {
//     public readonly type = CLEAR_INDIVIDUAL_BOOKING_VC;
// }

export type EmployeeActions =
    AddEmployeeDetails;
