import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserDetailsState, UserDetailsAdapter } from './user-details.reducer';
import * as fromUserModel from '@app/models/data.model';

const getUserDetailsState = createFeatureSelector<UserDetailsState>('user');

const getUserState = createSelector(
    getUserDetailsState,
    (state: UserDetailsState) => state
);

const {
    selectAll,
} = UserDetailsAdapter.getSelectors(getUserState);

export const getUserEntities = selectAll;

export const getUserDetails = createSelector(
    getUserDetailsState,
    (state: UserDetailsState) => state && state.entities
);

export const getLoggedInUserData = createSelector(
    getUserEntities,
    (user: fromUserModel.UserData[]) => user && fromUserModel.getUser(user)
);

export const isUserLoggedIn = createSelector(
    getLoggedInUserData,
    (user: fromUserModel.UserData) => user?.logged
);

export const getUserLoggedInName = createSelector(
    getLoggedInUserData,
    (state: fromUserModel.UserData) => state && state.name
);

export const getUserLoggedInType = createSelector(
    getLoggedInUserData,
    (state: fromUserModel.UserData) => state && state.type
);

export const getUserLoggedInId = createSelector(
    getLoggedInUserData,
    (state: fromUserModel.UserData) => state && state.id
);

export const getUserLoggedInEmail = createSelector(
    getLoggedInUserData,
    (state: fromUserModel.UserData) => state && state.email
);

export const getLoggedUserToken = createSelector(
    getLoggedInUserData,
    (state: fromUserModel.UserData) => state && state.token
);

export const getUserRole = createSelector(
    getLoggedInUserData,
    (state: fromUserModel.UserData) => state && state.roles
);
