import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState, LoggedOutSuccessfully, GoToBaseRoute } from '@app/store';
import { DialogService } from '@app/core/services/dialog-service/dialog.service';
import { UpdateIndividualBookingVcStatus } from '@app/booking/store';
import { UpdateConferenceStatus } from '@app/booking/store/conference-room/conference-room.actions';

@Component({
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {

  public inputArgs: any;

  constructor(
    public readonly store$: Store<RootState>,
    private readonly dialogService: DialogService
  ) { }

  public ngOnInit(): void {
  }

  private triggerSignOutAction(): void {
    this.store$.dispatch(new LoggedOutSuccessfully({loggedIn: false}));
    this.store$.dispatch(new GoToBaseRoute());
  }

  private triggerCancelBookingAction(bookingId): void {
    this.store$.dispatch(new UpdateIndividualBookingVcStatus({bookingId}));
    this.store$.dispatch(new UpdateConferenceStatus({bookingId}));
  }

  public triggerSelectedAction(bookingId): void {
    this.inputArgs.actionText === 'Logout' ? this.triggerSignOutAction() : this.triggerCancelBookingAction(bookingId);
    this.dialogService.closeAllDialogs();
  }

}
