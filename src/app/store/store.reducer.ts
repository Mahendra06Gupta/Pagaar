import { Action } from '@ngrx/store';
import { RootState } from './models/root-state.model';
import {merge, pick} from 'lodash-es';

function setSavedState(state: any, localStoreKey: string) {
    localStorage.setItem(localStoreKey, JSON.stringify(state));
}

function getSavedState(localStoreKey: string): any {
    return JSON.parse(localStorage.getItem(localStoreKey));
}

const stateKeys = ['user', 'dashboard'];
const localStorageKey = '__app_storage__';

export function rootStoreMetaReducer(reducer): (state, action: Action) => RootState {
    let onInit = true;
    return function crossRootStoreReducer(state, action: Action): RootState {
        switch (action.type) {
            default: {
                const nextState = reducer(state, action);
                if (onInit) {
                    onInit = false;
                    const savedState = getSavedState(localStorageKey);
                    return merge(nextState, savedState);
                }
                const stateToSave = pick(nextState, stateKeys);
                setSavedState(stateToSave, localStorageKey);
                return nextState;
            }
        }
    };
}
