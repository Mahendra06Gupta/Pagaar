import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { RootState, GoToLogin } from '@app/store';
import { UserData } from '@app/models/data.model';
import * as fromUserDataSelector from '@app/store/user-details/user-details.selectors';
import { fromBookingsSelectors } from '@app/booking/store/store';
import { ConferenceRoomOverviewModel, VcModel } from '@app/booking/models/conference-overview/conference-room-overview.model';
import { BookIndividualVcRoom } from '@app/booking/store';
import { UpdateBookedConferenceRoom } from '@app/booking/store/conference-room/conference-room.actions';
import { TimeSlotValidationService } from '@app/core/services/time-slot-validation/time-slot-validation.service';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { getSavedState, localStorageKey } from '@app/booking/store/booking.reducer';
import { VcOverlap } from '@app/booking/models/room-overview/individual-room-overview.model';

declare let Email: any;

export const DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None
})
export class BookingFormComponent implements OnInit {

  public roomBookingForm: FormGroup;
  public conferenceData: ConferenceRoomOverviewModel[];
  public conferenceRoomData: VcModel[];
  public user: UserData;
  public userAuthenticate = getSavedState(localStorageKey);
  public roomSelected: string[];
  public startDate = moment();
  public currentTime = moment().format('HH:mm');
  public toTime = moment().add(3, 'hours').format('HH:mm');
  public submitButton = 'Create Room';
  public isSubmitted = false;
  public isCreating = false;

  constructor(
    public readonly fb: FormBuilder,
    private store$: Store<RootState>,
    private toastr: ToastrService,
    private timeSlotValidationService: TimeSlotValidationService,
    private readonly dialogService: DialogService
  ) { }

  public ngOnInit(): void {
    forkJoin([
      this.store$.select(fromUserDataSelector.getLoggedInUserData).pipe(first()),
      this.store$.select(fromBookingsSelectors.getConferenceEntities).pipe(first()),
      this.store$.select(fromBookingsSelectors.getConferenceRoomEntities).pipe(first())
    ]).subscribe(([user, conferenceData, conferenceRoomData]) => {
      this.user = user;
      this.conferenceData = conferenceData;
      this.conferenceRoomData = conferenceRoomData;
      this.initForm();
    });
  }

  public onSubmit(): void {
    this.isSubmitted = true;
    this.isCreating = false;
    this.submitButton = 'Creating...';
    const overlap = this.hasTimeError(this.roomBookingForm.controls.date.value, this.roomBookingForm.controls.vcId.value);
    if (overlap) {
      let vcIdTobeBooked = this.roomBookingForm.controls.vcId.value;
      const overlapVc = overlap && overlap.length === 0 ? '' : this.getOverlappedVc(vcIdTobeBooked, overlap);
      vcIdTobeBooked = overlapVc && overlapVc.length !== 0 ? vcIdTobeBooked.filter((val: string) => !overlapVc.includes(val)) : vcIdTobeBooked;
      const data = [];
      let bookingId = +this.conferenceData.slice(-1)[0].bookingId.match(/\d+/)[0];
      vcIdTobeBooked.forEach((vcId: string) => {
        bookingId++;
        data.push(this.prepareBookingData(vcId, `B${bookingId}`));
      });
      this.callBookingAction(data, overlap);
    } else {
      this.isSubmitted = false;
      this.isCreating = false;
      this.submitButton = 'Create Room';
    }
  }

  private getOverlappedVc(vcId: string[], overlap: VcOverlap[]): string[] {
    const overlapVcId = [];
    if ( vcId && overlap && vcId.length !== 0 && overlap.length !== 0) {
      for (const vc of vcId) {
        for (const overlapId of overlap) {
          if (overlapId.vcId === vc) {
            overlapVcId.push(vc);
          }
        }
      }
    }

    return overlapVcId;
  }

  private callBookingAction(data, overlap: VcOverlap[]): void {

    setTimeout(() => {
      if (this.userAuthenticate) {
        data.forEach((bookingdata: ConferenceRoomOverviewModel) => {
          this.store$.dispatch(new BookIndividualVcRoom(bookingdata)),
          this.store$.dispatch(new UpdateBookedConferenceRoom(bookingdata));
        });
        if (overlap && overlap.length !== 0) {
          overlap.forEach((overlapdata) => {
            if (overlapdata.vcId !== '') {
              this.toastr.error(`${overlapdata.vcId} is already booked by ${overlapdata.bookedBy} at ${overlapdata.overlapTimeAndDate}`);
            } else {
              this.isCreating = true;
              this.isSubmitted = false;
              this.submitButton = 'Completed';
              setTimeout(() => {
                this.sendEmail();
                this.dialogService.closeAllDialogs();
                this.isCreating = false;
              } , 2000);
              this.toastr.success('Room(s) added Successfully');
              this.store$.select(fromBookingsSelectors.getBookingEntities).subscribe(
                res => this.dialogService.isRoomAdded.next(res)
              );
            }
          });
        }
      } else {
        this.dialogService.closeAllDialogs();
        this.toastr.error('Please login again to proceed');
        this.store$.dispatch(new GoToLogin());
      }
    }, 2000);
  }

  private sendEmail() {
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'demoxyz199@gmail.com',
      Password : '9166685407408C597BF13B0FA745A91ED39D',
      To : 'demoxyz199@gmail.com',
      From : 'demoxyz199@gmail.com',
      Subject : 'Confirmation Of Room Booking',
      Body : `
      <i>Your request for conference booking is succesfully</i> <br><br> Thanks & Regards <br><br> Management `
    }).then( message => this.toastr.success('Fake Message Email Send Successfully'));
  }

  private prepareBookingData(vcId: string, bookingId: string): ConferenceRoomOverviewModel {
    return {
      roomName: vcId,
      roomId: vcId,
      date: moment(this.roomBookingForm.controls.date.value, 'DD-MM-YYYY'),
      bookedBy: this.roomBookingForm.controls.name.value,
      slot: `${this.roomBookingForm.controls.fromTime.value}-${this.roomBookingForm.controls.toTime.value}`,
      status: 'Booked',
      bookingId
    };
  }

  public changed(): void {
    if (this.roomBookingForm.controls.vcId.value && this.roomBookingForm.controls.vcId.value.length <= 3) {
      this.roomSelected = this.roomBookingForm.controls.vcId.value;
    } else {
      this.toastr.error('Maximum 3 room(s) can be booked');
      this.roomBookingForm.controls.vcId.setValue(this.roomSelected);
    }
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.roomBookingForm.controls[controlName].hasError(errorName);
  }

  public hasTimeError(dateValue: moment.Moment, vcId: string[]): VcOverlap[] {
    const fromTime = this.roomBookingForm.controls.fromTime.value;
    const toTime = this.roomBookingForm.controls.toTime.value;
    return this.timeSlotValidationService.isBookingtimeOverlap(fromTime, toTime, this.currentTime, dateValue, vcId, this.startDate);
  }

  private initForm(): void {
    this.roomBookingForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      emailId: [this.user.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      type: [this.user.type, [Validators.required]],
      vcId: ['', [Validators.required]],
      date: [this.startDate, [Validators.required]],
      fromTime: [this.currentTime, [Validators.required]],
      toTime: [this.toTime, [Validators.required]]
    });
  }

}
