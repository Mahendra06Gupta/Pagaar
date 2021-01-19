import { EmployersDetail } from '@app/employer-profile/models/employer-detail.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';


import { ADD_EMPLOYER_DETAILS, EmployerActions } from './employer.actions';

export interface EmployerState extends EntityState<EmployersDetail> {
    initiated: boolean;
}

export const employerAdapter: EntityAdapter<EmployersDetail> = createEntityAdapter<EmployersDetail>({
    selectId: employer => employer.id
});

export const INITIAL_EMPLOYER_STATE: EmployerState = employerAdapter.getInitialState({
    initiated: false,
});

export function EmployerReducer(state: EmployerState = INITIAL_EMPLOYER_STATE, action: EmployerActions): EmployerState {
    switch (action.type) {
        case ADD_EMPLOYER_DETAILS:
            return employerAdapter.setAll(action.payload, {
                ...state,
                initiated: true
            });
        default:
            return state;
    }
}
