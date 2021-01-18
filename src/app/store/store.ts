import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { RootState } from './models/root-state.model';

import * as fromUserDetailsReducer from './user-details/user-details.reducer';
import * as fromEmployeeReducer from './employee-store/employee.reducer';
import * as fromRouterReducer from './router/router.reducer';

import * as userDetailsSelectors from './user-details/user-details.selectors';
import * as fromEmployeeSelectors from './employee-store/employee.selectors';
import * as routerSelectors from './router/router.selectors';
import { RouterEffects } from './router/router.effects';

export const ROOT_REDUCERS: ActionReducerMap<RootState> = {
    user: fromUserDetailsReducer.UserDetailsReducer,
    router: fromRouterReducer.routerReducer,
    employee: fromEmployeeReducer.EmployeeReducer
};

export const ROOT_EFFECTS: any[] = [
    RouterEffects
];

export const fromUserSelector = userDetailsSelectors;
export const fromRouterSelector = routerSelectors;
export const fromEmployeeSelector = fromEmployeeSelectors;
