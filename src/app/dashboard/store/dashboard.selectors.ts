import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardsState, DashboardState } from './dashboard.reducer';

const getDashboardState = createFeatureSelector<DashboardsState>('dashboard');

export const getJobResult = createSelector(
    getDashboardState,
    dashboardstate => dashboardstate && dashboardstate.dashboardState && dashboardstate.dashboardState.jobResult
);

export const getSearchKeyword = createSelector(
    getDashboardState,
    dashboardstate => dashboardstate && dashboardstate.dashboardState && dashboardstate.dashboardState.searchKeyword
);

export const isSearcgInitiated = createSelector(
    getSearchKeyword,
    searchKeyword => searchKeyword && searchKeyword.initiated
);

export const getSearchKeywordTitle = createSelector(
    getSearchKeyword,
    searchKeyword => searchKeyword && searchKeyword.jobTitle
);
