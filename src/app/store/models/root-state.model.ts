import { RouterReducerState } from '@ngrx/router-store';

import { UserDetailsState } from '../user-details/user-details.reducer';
import { RouterState } from '../router/router.reducer';

export interface RootState {
    router: RouterReducerState<RouterState>;
    user: UserDetailsState;
}
