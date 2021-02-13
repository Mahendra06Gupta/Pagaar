import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserData } from '@app/models/data.model';
import { UserDetailsActions, LOAD_USER, USER_LOGIN, UPDATE_APPLICATION_ID, LOGIN_SUCCESSFULLY, LOGOUT_SUCCESSFULLY, CREATE_ADMIN_ACCOUNT } from './user-details.actions';
import { act } from '@ngrx/effects';

export interface UserDetailsState extends EntityState<UserData> {
    createAdminAccount: boolean;
    applicationId: {updateApplicationId: string, mode: string};
}

export interface UserDetailsState extends EntityState<UserData> {}

export const UserDetailsAdapter: EntityAdapter<UserData> = createEntityAdapter<UserData>({
    selectId: user => user.email
});

export const INITIAL_USERDETAILS_STATE: UserDetailsState = UserDetailsAdapter.getInitialState({
    createAdminAccount: false,
    applicationId: {
        updateApplicationId: '',
        mode: ''
    }
});

export function UserDetailsReducer(state: UserDetailsState = INITIAL_USERDETAILS_STATE, action: UserDetailsActions): UserDetailsState {
    switch (action.type) {
        case USER_LOGIN: {
            // return UserDetailsAdapter.setAll(action.payload, {
            //     ...state
            // });
            localStorage.setItem('role', JSON.stringify(action.payload[0].roles));
            return UserDetailsAdapter.setAll(action.payload, state);
        }
        case CREATE_ADMIN_ACCOUNT: {
            return {
                ...state,
                createAdminAccount: action.payload.createAdminAccount
            };
        }
        case UPDATE_APPLICATION_ID: {
            return {
                ...state,
                applicationId: action.payload
            };
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
