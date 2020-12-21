import { Action } from '@ngrx/store';
import { VcModel } from '@app/dashboard/models/conference-overview/conference-room-overview.model';

export const INIT_CONFERENCE = '[ADD_CONFERENCE] INIT_CONFERENCE';
export const NEW_CONFERENCE_ADDED = '[ADD_CONFERENCE] NEW_CONFERENCE_ADDED';
export const CLEAR_CONFERENCE_ROOM = '[ADD_CONFERENCE] CLEAR_CONFERENCE_ROOM';

export class InitConferenceRoom implements Action {
    public readonly type = INIT_CONFERENCE;

    constructor(public payload: VcModel[]) {
    }
}

export class AddNewConferenceRoom implements Action {
    public readonly type = NEW_CONFERENCE_ADDED;

    constructor(public payload: VcModel) {
    }
}

export class ClearConferenceRoom implements Action {
    public readonly type = CLEAR_CONFERENCE_ROOM;
}

export type ConferenceAddingActions =
    InitConferenceRoom |
    AddNewConferenceRoom |
    ClearConferenceRoom ;
