import { RouterReducerState } from '@ngrx/router-store';

import { UserDetailsState } from '../user-details/user-details.reducer';
import { RouterState } from '../router/router.reducer';
import { EmployeeState } from '../employee-store/employee.reducer';
import { EmployerState } from '../employer-store/employer.reducer';

export interface RootState {
    router: RouterReducerState<RouterState>;
    user: UserDetailsState;
    employee: EmployeeState;
    employer: EmployerState;
}
