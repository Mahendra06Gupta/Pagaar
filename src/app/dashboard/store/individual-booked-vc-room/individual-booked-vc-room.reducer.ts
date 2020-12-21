import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import {
    INIT_INDIVIDUAL_BOOKING_VC,
    UPDATE_INDIVIDUAL_BOOKING_STATUS_VC,
    CLEAR_INDIVIDUAL_BOOKING_VC,
    BookingVcActions,
    BOOK_INDIVIDUAL_VC_ROOM
} from './individual-booked-vc-room.actions';
import { IndividualRoomOverviewModel } from '../../models/room-overview/individual-room-overview.model';

export interface BookingVcState extends EntityState<IndividualRoomOverviewModel> {
    initiated: boolean;
}

export const bookingAdapter: EntityAdapter<IndividualRoomOverviewModel> = createEntityAdapter<IndividualRoomOverviewModel>({
    selectId: booking => booking.bookingId
});

export const INITIAL_BOOKING_VC_STATE: BookingVcState = bookingAdapter.getInitialState({
    initiated: false,
});

export function bookingVcReducer(state: BookingVcState = INITIAL_BOOKING_VC_STATE, action: BookingVcActions): BookingVcState {
    switch (action.type) {
        case INIT_INDIVIDUAL_BOOKING_VC:
            return bookingAdapter.addAll(action.payload, {
                ...state,
                initiated: true
            });
        case UPDATE_INDIVIDUAL_BOOKING_STATUS_VC:
            return bookingAdapter.updateOne(
                {
                    id: action.payload.bookingId,
                    changes: {
                        ...state.entities[action.payload.bookingId],
                        status: 'Cancelled'
                    }
                },
                state
            );
        case BOOK_INDIVIDUAL_VC_ROOM:
            const {
                roomName,
                roomId,
                date,
                bookedBy,
                slot,
                status,
                bookingId,
            } = action.payload;
            return bookingAdapter.addOne({
                roomName,
                roomId,
                date,
                bookedBy,
                slot,
                status,
                bookingId,
            }, state);
        case CLEAR_INDIVIDUAL_BOOKING_VC:
            return INITIAL_BOOKING_VC_STATE;
        default:
            return state;
    }
}
