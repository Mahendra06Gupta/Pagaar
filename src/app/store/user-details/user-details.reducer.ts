import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserData } from '@app/models/data.model';
import { UserDetailsActions, LOAD_USER, USER_LOGIN, LOGIN_SUCCESSFULLY, LOGOUT_SUCCESSFULLY } from './user-details.actions';
import { act } from '@ngrx/effects';

// export interface UserDetailsState extends EntityState<UserData> {
//     loggedIn: boolean;
//     userLogged: string;
//     userType: string;
// }

export interface UserDetailsState extends EntityState<UserData> {}

export const UserDetailsAdapter: EntityAdapter<UserData> = createEntityAdapter<UserData>({
    selectId: user => user.email
});

export const INITIAL_USERDETAILS_STATE: UserDetailsState = UserDetailsAdapter.getInitialState({});

export function UserDetailsReducer(state: UserDetailsState = INITIAL_USERDETAILS_STATE, action: UserDetailsActions): UserDetailsState {
    switch (action.type) {
        case USER_LOGIN: {
            // return UserDetailsAdapter.setAll(action.payload, {
            //     ...state
            // });
            localStorage.setItem('role', JSON.stringify(action.payload[0].roles));
            return UserDetailsAdapter.setAll(action.payload, state);
        }
        // case LOGIN_SUCCESSFULLY: {
        //     return {
        //         ...state,
        //         logged: action.payload.loggedIn
        //     };
        // }
        // case LOGOUT_SUCCESSFULLY: {
        //     return {
        //         ...state,
        //         logged: action.payload.loggedIn,
        //     };
        // }
        default:
        return state;
    }
}
