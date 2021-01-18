import { ActionReducerMap } from '@ngrx/store';

import * as fromDashboardReducer from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';
import { DashboardsState } from './dashboard.reducer';

export const DASHBOARD_REDUCERS: ActionReducerMap<DashboardsState> = {
    dashboardState: fromDashboardReducer.dashboardReducer
};

export const DASHBOARD_EFFECTS: any[] = [];

export const fromDashboardSelectors = DashboardSelectors;
