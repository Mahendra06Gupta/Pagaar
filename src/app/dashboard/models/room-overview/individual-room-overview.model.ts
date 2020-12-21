import { Moment } from 'moment';

export interface IndividualRoomOverviewModel {
    roomName: string;
    roomId: string;
    date: Moment;
    bookedBy: string;
    slot: string;
    status: string;
    bookingId: string;
}

export interface RoomModel {
    booking: IndividualRoomOverviewModel[];
}

export interface VcIdOverlapModel {
    vcId: string;
    overlap: boolean;
}

export interface VcOverlap extends VcIdOverlapModel {
    overlapTimeAndDate: string;
    bookedBy: string;
}

export function getNoOfCancelBooking(bookingEntities: IndividualRoomOverviewModel[]): object {
    let noOfCancel = 0;
    let noOfActive = 0;
    const totalBooking = bookingEntities && bookingEntities.length;
    for (const booking of bookingEntities) {
        (booking.status === 'Cancelled') ? noOfCancel++ : noOfActive++;
    }
    return { totalBooking, noOfActive, noOfCancel };
}
