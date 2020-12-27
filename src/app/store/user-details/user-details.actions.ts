import { Action } from '@ngrx/store';
import { UserData } from '@app/models/data.model';

export const LOAD_USER = '[USER_DETAILS] LOAD_USER_DETAILS';
export const USER_LOGIN = '[USER_DETAILS] USER_LOGIN';
export const LOGIN_SUCCESSFULLY = '[USER_DETAILS] LOGIN_SUCCESSFULLY';
export const LOGOUT_SUCCESSFULLY = '[USER_DETAILS] LOGOUT_SUCCESSFULLY';

// export class LoadUserRegistered implements Action {
//     public readonly type = LOAD_USER;

//     constructor(public readonly payload: {userDetails: UserData[] }) {
//     }
// }

export class UserLogged implements Action {
    public readonly type = USER_LOGIN;

    constructor(public readonly payload: {email: string, token: string, logged: boolean}[]) {
    }
}

export class LoggedInSuccessfully implements Action {
    public readonly type = LOGIN_SUCCESSFULLY;

    constructor(public readonly payload: {loggedIn: boolean}) {
    }
}

export class LoggedOutSuccessfully implements Action {
    public readonly type = LOGOUT_SUCCESSFULLY;

    constructor(public readonly payload: {loggedIn: boolean}) {
    }
}

export type UserDetailsActions =
    // LoadUserRegistered |
    UserLogged |
    LoggedInSuccessfully |
    LoggedOutSuccessfully;
