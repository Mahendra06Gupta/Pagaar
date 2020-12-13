import { Params } from '@angular/router';
import {
    ROUTER_CANCEL,
    ROUTER_ERROR,
    ROUTER_NAVIGATED,
    ROUTER_NAVIGATION,
    RouterAction,
    RouterReducerState
} from '@ngrx/router-store';
import { BaseRouterStoreState } from '@ngrx/router-store';

export interface RouterState {
    url: string;
    params: Params;
    queryParams: Params;
}

export type AppRouterReducerState<T extends BaseRouterStoreState> = RouterReducerState<T> & {
    previousRouterState: RouterState,
    stateChangeRequest: RouterState,
};

export function routerReducer(routerState: AppRouterReducerState<RouterState>,
                              action: RouterAction<any, RouterState>): AppRouterReducerState<RouterState> {
    switch (action.type) {
        case ROUTER_NAVIGATION: {
            return {
                ...routerState,
                stateChangeRequest: action.payload.routerState,
                navigationId: action.payload.event.id,
            };
        }
        case ROUTER_ERROR:
        case ROUTER_CANCEL: {
            return {
                ...routerState,
                stateChangeRequest: undefined,
                navigationId: action.payload.event.id,
            };
        }
        case ROUTER_NAVIGATED: {
            return {
                previousRouterState: routerState.state,
                state: action.payload.routerState,
                stateChangeRequest: undefined,
                navigationId: action.payload.event.id,
            };
        }
        default:
            return routerState;
    }
}
