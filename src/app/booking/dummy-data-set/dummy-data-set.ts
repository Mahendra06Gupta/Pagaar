import { RoomModel } from '@app/booking/models/room-overview/individual-room-overview.model';
import * as moment from 'moment';
import { ConferenceRoomModel, VcModel } from '../models/conference-overview/conference-room-overview.model';

export const Admin1: RoomModel = {
    booking: [
        { roomName: 'VC1', roomId: 'VC1', date: moment('04/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Admin1',  slot: '9:00-10:00', status: 'Booked', bookingId: 'B1'},
        { roomName: 'VC2', roomId: 'VC2', date: moment('04/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Admin1',  slot: '12:00-14:00', status: 'Booked', bookingId: 'B2'},
        { roomName: 'VC3', roomId: 'VC3', date: moment('04/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Admin1',  slot: '15:00-16:00', status: 'Cancelled', bookingId: 'B3'},
        { roomName: 'VC4', roomId: 'VC4', date: moment('05/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Admin1',  slot: '18:00-20:00', status: 'Booked', bookingId: 'B4'}
    ]
};

export const Admin2: RoomModel = {
    booking: [
        { roomName: 'VC1', roomId: 'VC1', date: moment('05/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Admin2',  slot: '10:00-11:00', status: 'Booked', bookingId: 'B5'},
        { roomName: 'VC2', roomId: 'VC2', date: moment('05/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Admin2',  slot: '11:00-12:00', status: 'Cancelled', bookingId: 'B6'},
        { roomName: 'VC3', roomId: 'VC3', date: moment('05/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Admin2',  slot: '14:00-15:00', status: 'Booked', bookingId: 'B7'},
        { roomName: 'VC4', roomId: 'VC4', date: moment('05/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Admin2',  slot: '17:00-18:00', status: 'Booked', bookingId: 'B8'}
    ]
};

export const Organizations1: RoomModel = {
    booking: [
        { roomName: 'VC1', roomId: 'VC1', date: moment('06/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Organizations1',  slot: '9:00-12:00', status: 'Booked', bookingId: 'B9'},
        { roomName: 'VC2', roomId: 'VC2', date: moment('06/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Organizations1',  slot: '12:00-15:00', status: 'Booked', bookingId: 'B10'},
        { roomName: 'VC3', roomId: 'VC3', date: moment('06/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Organizations1',  slot: '16:00-18:00', status: 'Booked', bookingId: 'B11'},
        { roomName: 'VC4', roomId: 'VC4', date: moment('06/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Organizations1',  slot: '19:00-21:00', status: 'Cancelled', bookingId: 'B12'}
    ]
};

export const Organizations2: RoomModel = {
    booking: [
        { roomName: 'VC1', roomId: 'VC1', date: moment('10/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Organizations2',  slot: '9:00-12:00', status: 'Cancelled', bookingId: 'B13'},
        { roomName: 'VC2', roomId: 'VC2', date: moment('10/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Organizations2',  slot: '12:00-15:00', status: 'Booked', bookingId: 'B14'},
        { roomName: 'VC3', roomId: 'VC3', date: moment('10/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Organizations2',  slot: '15:00-18:00', status: 'Booked', bookingId: 'B15'},
        { roomName: 'VC4', roomId: 'VC4', date: moment('10/05/2020', 'DD-MM-YYYY').utc(), bookedBy: 'Organizations2',  slot: '14:00-15:00', status: 'Booked', bookingId: 'B16'}
    ]
};

export const presentRoomId: ConferenceRoomModel = {
    conference: [
        ...Admin1.booking,
        ...Admin2.booking,
        ...Organizations1.booking,
        ...Organizations2.booking
    ]
};

export const VcIdAvailable: VcModel[] = [
    { roomName: 'VC1', roomId: 'VC1', roomAddedOn: moment('10/02/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin1'},
    { roomName: 'VC2', roomId: 'VC2', roomAddedOn: moment('10/03/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin2'},
    { roomName: 'VC3', roomId: 'VC3', roomAddedOn: moment('10/04/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin2'},
    { roomName: 'VC4', roomId: 'VC4', roomAddedOn: moment('10/04/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin2'},
    { roomName: 'VC5', roomId: 'VC5', roomAddedOn: moment('10/04/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin1'},
    { roomName: 'VC6', roomId: 'VC6', roomAddedOn: moment('15/04/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin1'},
    { roomName: 'VC7', roomId: 'VC7', roomAddedOn: moment('20/04/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin2'},
    { roomName: 'VC8', roomId: 'VC8', roomAddedOn: moment('21/04/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin1'},
    { roomName: 'VC9', roomId: 'VC9', roomAddedOn: moment('25/04/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin2'},
    { roomName: 'VC10', roomId: 'VC10', roomAddedOn: moment('27/04/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin1'},
    { roomName: 'VC11', roomId: 'VC11', roomAddedOn: moment('02/05/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin1'},
    { roomName: 'VC12', roomId: 'VC12', roomAddedOn: moment('03/05/2020', 'DD-MM-YYYY').utc(), createdBy: 'Admin2'},
];
