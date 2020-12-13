import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserData } from '@app/models/data.model';
import { UserDetailsActions, LOAD_USER, USER_LOGIN, LOGIN_SUCCESSFULLY, LOGOUT_SUCCESSFULLY } from './user-details.actions';

export interface UserDetailsState extends EntityState<UserData> {
    loggedIn: boolean;
    userLogged: string;
    userType: string;
}

export const UserDetailsAdapter: EntityAdapter<UserData> = createEntityAdapter<UserData>({
    selectId: user => user.id
});

export const INITIAL_USERDETAILS_STATE: UserDetailsState = UserDetailsAdapter.getInitialState({
    loggedIn: false,
    userLogged: '',
    userType: ''
});

export function UserDetailsReducer(state: UserDetailsState = INITIAL_USERDETAILS_STATE, action: UserDetailsActions): UserDetailsState {
    switch (action.type) {
        case LOAD_USER: {
            return UserDetailsAdapter.addAll(action.payload.userDetails, {
                ...state,
            });
        }
        case USER_LOGIN: {
            return UserDetailsAdapter.updateOne(
                {
                    id: action.payload.id,
                    changes: {
                        ...state.entities[action.payload.id],
                        logged: action.payload.logged
                    }
                },
                state
            );
        }
        case LOGIN_SUCCESSFULLY: {
            return {
                ...state,
                loggedIn: action.payload.loggedIn
            };
        }
        case LOGOUT_SUCCESSFULLY: {
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
            };
        }
        default:
        return state;
    }
}
