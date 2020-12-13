import { Moment } from 'moment';
export interface ConferenceRoomOverviewModel {
    roomName: string;
    roomId: string;
    date: Moment;
    bookedBy: string;
    slot: string;
    status: string;
    bookingId: string;
}

export interface ConferenceRoomModel {
    conference: ConferenceRoomOverviewModel[];
}

export interface VcModel {
    roomName: string;
    roomId: string;
    roomAddedOn: Moment;
    createdBy: string;
}

export function getConferenceForAParticularDate(conferenceEntities: ConferenceRoomOverviewModel[], date: Moment) {
    const conferenceForADate = [];

    for (const conference of conferenceEntities) {
        const conferenceDate =  new Date(conference.date.toString());
        const selectedDate = new Date(date.toISOString());
        if (`${conferenceDate.getDate()}-${conferenceDate.getMonth()}-${conferenceDate.getFullYear()}`
        === `${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}` && conference.status !== 'Cancelled') {
            conferenceForADate.push(conference);
        }
    }

    return conferenceForADate;

}

export function getNoOfCancelConference(conferenceEntities: ConferenceRoomOverviewModel[]): object {
    let noOfCancel = 0;
    let noOfActive = 0;
    const totalBooking = conferenceEntities && conferenceEntities.length;
    for (const booking of conferenceEntities) {
        (booking.status === 'Cancelled') ? noOfCancel++ : noOfActive++;
    }
    return { totalBooking, noOfActive, noOfCancel };
}
