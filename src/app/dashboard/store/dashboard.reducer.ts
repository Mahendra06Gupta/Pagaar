import { INIT_ACTION } from '@ngrx/store-devtools/src/reducer';
import { DashboardActions, INIT_DASHBOARD_SEARCH, UPDATE_DASHBOARD_SEARCH_RESULT } from './dashboard.actions';
import { JobReuslt } from './models/dashboard-state.model';
export interface DashboardState {
    searchKeyword: {jobTitle: string, location: string, initiated: boolean, pageSize: number, pageNumber: number};
    jobResult: JobReuslt;
}

export interface DashboardsState {
    dashboardState: DashboardState;
}

export const DASHBOARD_INITIAL_STATE: DashboardState = {
    searchKeyword: undefined,
    jobResult: undefined
};

export function dashboardReducer(state = DASHBOARD_INITIAL_STATE, action: DashboardActions): DashboardState {
    switch ( action.type ) {
        case INIT_DASHBOARD_SEARCH: {
            return {
                ...state,
                searchKeyword: action.payload
            };
        }
        case UPDATE_DASHBOARD_SEARCH_RESULT: {
            return {
                ...state,
                jobResult: action.payload
            };
        }
    }
}
