import { Action } from '@ngrx/store';
import { JobReuslt } from './models/dashboard-state.model';

export const INIT_DASHBOARD_SEARCH = '[DASHBOARD] INIT_DASHBOARD_SEARCH';
export const UPDATE_DASHBOARD_SEARCH_RESULT = '[DASHBOARD] UPDATE_DASHBOARD_SEARCH_RESULT';

export class InitDashboardSearch implements Action {
    public readonly type = INIT_DASHBOARD_SEARCH;

    constructor(public payload: {jobTitle: string, location: string, initiated: boolean}) {
    }
}
export class UpdateDashboardSearchResult implements Action {
    public readonly type = UPDATE_DASHBOARD_SEARCH_RESULT;

    constructor(public payload: JobReuslt) {
    }
}

export type DashboardActions =
    InitDashboardSearch |
    UpdateDashboardSearchResult;
