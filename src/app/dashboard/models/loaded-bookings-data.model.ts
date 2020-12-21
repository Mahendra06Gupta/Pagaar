import { IndividualRoomOverviewModel } from './room-overview/individual-room-overview.model';
import { ConferenceRoomOverviewModel, VcModel } from './conference-overview/conference-room-overview.model';

export interface LoadedBookingsData {
    booking: IndividualRoomOverviewModel[];
    conference: ConferenceRoomOverviewModel[];
    conferenceRoom: VcModel[];
}
