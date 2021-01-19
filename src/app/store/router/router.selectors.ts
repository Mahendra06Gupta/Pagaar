import { MainRoutes } from '@app/app.route-names';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppRouterReducerState, RouterState } from './router.reducer';

const getRouterState = createFeatureSelector<AppRouterReducerState<RouterState>>('router');

export const getActiveUrl = createSelector(
    getRouterState,
    router => router?.state?.url
);

export const isIamLoginPageORCreateAccountPage = createSelector(
    getActiveUrl,
    (activeUrl: string) => activeUrl?.includes(MainRoutes.login) || activeUrl?.includes(MainRoutes.createAccount)
);

export const isIamJobPostingPage = createSelector(
    getActiveUrl,
    (activeUrl: string) => {
        return activeUrl?.includes(MainRoutes.jobPosting);
    }
);
