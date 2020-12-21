import { Action } from '@ngrx/store';
import { RoomModel, IndividualRoomOverviewModel } from '../../models/room-overview/individual-room-overview.model';

export const INIT_INDIVIDUAL_BOOKING_VC = '[BOOKING_VC] INIT_BOOKING_VC';
export const UPDATE_INDIVIDUAL_BOOKING_STATUS_VC = '[BOOKING_VC] UPDATE_INDIVIDUAL_BOOKING_STATUS_VC';
export const CLEAR_INDIVIDUAL_BOOKING_VC = '[BOOKING_VC] CLEAR_INDIVIDUAL_BOOKING_VC';
export const BOOK_INDIVIDUAL_VC_ROOM = '[BOOKING_VC] BOOK_INDIVIDUAL_VC_ROOM';

export class InitIndividualBookingVc implements Action {
    public readonly type = INIT_INDIVIDUAL_BOOKING_VC;

    constructor(public payload: IndividualRoomOverviewModel[]) {
    }
}

export class BookIndividualVcRoom implements Action {
    public readonly type = BOOK_INDIVIDUAL_VC_ROOM;

    constructor(public payload: IndividualRoomOverviewModel) {
    }
}

export class UpdateIndividualBookingVcStatus implements Action {
    public readonly type = UPDATE_INDIVIDUAL_BOOKING_STATUS_VC;

    constructor(public payload: {bookingId: string}) {
    }
}

export class ClearInidividualBookingsVc implements Action {
    public readonly type = CLEAR_INDIVIDUAL_BOOKING_VC;
}

export type BookingVcActions =
    InitIndividualBookingVc |
    UpdateIndividualBookingVcStatus |
    ClearInidividualBookingsVc |
    BookIndividualVcRoom ;
