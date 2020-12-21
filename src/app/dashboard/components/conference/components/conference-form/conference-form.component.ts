import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { RootState } from '@app/store';
import { UserData } from '@app/models/data.model';
import * as fromUserDataSelector from '@app/store/user-details/user-details.selectors';
import { fromBookingsSelectors } from '@app/dashboard/store/store';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ConferenceRoomOverviewModel, VcModel } from '@app/dashboard/models/conference-overview/conference-room-overview.model';
import { BookIndividualVcRoom } from '@app/dashboard/store';
import { UpdateBookedConferenceRoom, UpdateSelectedBookingDate } from '@app/dashboard/store/conference-room/conference-room.actions';
import { TimeSlotValidationService } from '@app/core/services/time-slot-validation/time-slot-validation.service';
import { VcIdOverlapModel, VcOverlap } from '@app/dashboard/models/room-overview/individual-room-overview.model';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { AddNewConferenceRoom } from '@app/dashboard/store/conference-room-addition/conference-room-addition.actions';

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
  selector: 'app-conference-form',
  templateUrl: './conference-form.component.html',
  styleUrls: ['./conference-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None
})
export class ConferenceFormComponent implements OnInit {

  public conferenceAddingForm: FormGroup;
  public conferenceRoomData: VcModel[];
  public user: UserData;
  public roomSelected: string[];
  public startDate = moment().format('DD/MM/YYYY').toString();
  public currentTime = moment().format('HH:mm');
  public toTime = moment().add(3, 'hours').format('HH:mm');

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
      this.store$.select(fromBookingsSelectors.getConferenceRoomEntities).pipe(first())
    ])
      .subscribe(([user, conferenceRoomData]) => {
      this.user = user;
      this.conferenceRoomData = conferenceRoomData;
      this.initForm();
    });
  }

  public onSubmit(): void {
    const isRoomAlreadyExsit = this.conferenceRoomData.some((room) => room.roomId === this.conferenceAddingForm.controls.vcId.value);
    !isRoomAlreadyExsit ? this.callAction() : this.toastr.error('Room alrady created please enter unique vcId');
  }

  private callAction(): void {
    this.store$.dispatch(new AddNewConferenceRoom(this.prepareBookingData()));
    this.store$.select(fromBookingsSelectors.getConferenceRoomEntities).subscribe(
      res => this.dialogService.isRoomAdded.next(res)
    );
    this.dialogService.closeAllDialogs();
    this.toastr.success('Conference added Succesfully');
  }

  private prepareBookingData(): VcModel {
    return {
      roomName: this.conferenceAddingForm.controls.vcId.value,
      roomId: this.conferenceAddingForm.controls.vcId.value,
      roomAddedOn: moment(this.conferenceAddingForm.controls.date.value, 'DD-MM-YYYY'),
      createdBy: this.conferenceAddingForm.controls.name.value
    };
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.conferenceAddingForm.controls[controlName].hasError(errorName);
  }

  private initForm(): void {
    this.conferenceAddingForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      emailId: [this.user.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      vcId: ['', [Validators.required]],
      date: [this.startDate, [Validators.required]],
    });
  }

}
