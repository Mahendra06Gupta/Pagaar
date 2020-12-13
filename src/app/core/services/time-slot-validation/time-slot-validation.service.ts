import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { RootState } from '@app/store';
import { UpdateSelectedBookingDate } from '@app/booking/store/conference-room/conference-room.actions';
import { fromBookingsSelectors } from '@app/booking/store/store';
import { ConferenceRoomOverviewModel } from '@app/booking/models/conference-overview/conference-room-overview.model';
import { VcIdOverlapModel, VcOverlap } from '@app/booking/models/room-overview/individual-room-overview.model';


@Injectable({
  providedIn: 'root'
})
export class TimeSlotValidationService {

  public format = 'hh:mm';
  public bookingExitingRoomOverlap: VcIdOverlapModel[] = [];
  public overlappedBookingRoom: VcOverlap[] = [];

  constructor(
    private toastr: ToastrService,
    private store$: Store<RootState>
  ) { }

  public isSelectedSlotValid(fromTime: moment.Moment, toTime: moment.Moment): boolean {

    const startTime = moment(fromTime, this.format);
    const endTime = moment(toTime, this.format);
    const difference = moment.duration(endTime.diff(startTime));
    const timeDifferenceInHours = difference.asHours();
    const differenceLessThanThreeHours = timeDifferenceInHours <= 3;

    if (!differenceLessThanThreeHours) {
      this.toastr.error('Meeting can be schedule maximum for 3 hours');
    }
    return differenceLessThanThreeHours;
  }

  public isSelectedTimeInValidRange(fromTime: moment.Moment, toTime: moment.Moment): boolean {

    const beforeTime = moment('09:00:00', this.format);
    const afterTime = moment('21:00:00', this.format);
    const selectedTimeInValidRange = moment(fromTime, this.format).isBetween(beforeTime, afterTime) && moment(toTime, this.format).isBetween(beforeTime, afterTime);
    if (!selectedTimeInValidRange) {
      this.toastr.error('Please select time slot between 9:00 Am and 9:00 Pm only');
    }
    return selectedTimeInValidRange;
  }

  public isSelectedTimePast(fromTime: moment.Moment, toTime: moment.Moment, currentTime: string, dateSelected: moment.Moment, currentDate: moment.Moment): boolean {

    const isSelectedDateToday = currentDate.isSame(dateSelected);
    const beforeTime = moment(currentTime, this.format);
    const selectedTimePast = isSelectedDateToday ? moment(fromTime, this.format).isBefore(beforeTime) || moment(toTime, this.format).isBefore(beforeTime) : false;
    if (selectedTimePast) {
      this.toastr.error('Meeting can not be schedule for past hours');
    }
    return selectedTimePast;
  }

  public isToTimeLessThanFromTime(fromTime: moment.Moment, toTime: moment.Moment): boolean {
    const toTimeLessThanFromTime = moment(toTime, this.format).isBefore(moment(fromTime, this.format));
    if (toTimeLessThanFromTime) {
      this.toastr.error('From time can not be greater than to time');
    }
    return toTimeLessThanFromTime;
  }

  public isTimeVerificationSucceed(fromTime: moment.Moment, toTime: moment.Moment, currentTime: string, dateSelected: moment.Moment, currentDate: moment.Moment): boolean {
    const isValid =
    !this.isToTimeLessThanFromTime(fromTime, toTime)
    && !this.isSelectedTimePast(fromTime, toTime, currentTime, dateSelected, currentDate)
    && this.isSelectedSlotValid(fromTime, toTime)
    && this.isSelectedTimeInValidRange(fromTime, toTime);

    return isValid;
  }

  public isBookingtimeOverlap(fromTime: moment.Moment, toTime: moment.Moment, currentTime: string, dateValue: moment.Moment, vcId: string[], currentDate: moment.Moment): VcOverlap[] {

    let sameDateConferences: ConferenceRoomOverviewModel[];
    this.bookingExitingRoomOverlap = [];
    this.overlappedBookingRoom = [];

    if (this.isTimeVerificationSucceed(fromTime, toTime, currentTime, dateValue, currentDate)) {
      this.store$.dispatch(new UpdateSelectedBookingDate(dateValue));
      this.store$.select(fromBookingsSelectors.getConferenceForAParticularDate).pipe(first()).subscribe(res => sameDateConferences = res);
      vcId.forEach((vc: string) =>
        this.isSelectedVcIdUnique(vc, sameDateConferences)
      );
      if (this.bookingExitingRoomOverlap && this.bookingExitingRoomOverlap.length === 0) {
        return [{vcId: '', overlap: true, overlapTimeAndDate: '', bookedBy: ''}];
      } else {
          this.overlappedBookingRoom = this.checkTimeOverlapforSameRoomId(this.bookingExitingRoomOverlap, fromTime, toTime, sameDateConferences);
          if (this.overlappedBookingRoom && this.overlappedBookingRoom.length === 0) {
            return [{vcId: '', overlap: true, overlapTimeAndDate: '', bookedBy: ''}];
          } else {
            return this.overlappedBookingRoom;
          }
      }
    }
  }

  private isSelectedVcIdUnique(vcId: string, conference: ConferenceRoomOverviewModel[]) {

    conference.forEach((conf) => {
    if (conf.roomId === vcId) {
      this.bookingExitingRoomOverlap.push(
        Object.assign({}, { vcId: conf.roomId }, { overlap: true })
      );
    }
  });

  }


  private checkTimeOverlapforSameRoomId(bookingExitingRoomOverlap: VcIdOverlapModel[], fromTime: moment.Moment, toTime: moment.Moment, conference: ConferenceRoomOverviewModel[]): VcOverlap[] {

    const roomToBeCheckedForOverlap: ConferenceRoomOverviewModel[] = [];
    let roomToTime: moment.Moment;
    let roomFromTime: moment.Moment;

    for (const vc of bookingExitingRoomOverlap) {
      for (const conf of conference) {
        if (conf.roomId === vc.vcId) {
          roomToBeCheckedForOverlap.push(conf);
        }
      }
    }

    roomToBeCheckedForOverlap.forEach(
      room => {
        roomFromTime = moment(room.slot.split('-')[0], this.format);
        roomToTime = moment(room.slot.split('-')[1], this.format);
        if (moment(fromTime, this.format).isBetween(roomFromTime, roomToTime) || moment(toTime, this.format).isBetween(roomFromTime, roomToTime)) {
          this.overlappedBookingRoom.push(
            Object.assign({},
              { vcId: room.roomId },
              { overlap: true },
              { overlapTimeAndDate: `${room.slot} on ${moment(room.date).format('DD/MM/YYYY')}` },
              { bookedBy: room.bookedBy }
            )
          );
        }
      }
    );

    return this.overlappedBookingRoom;

  }
}
