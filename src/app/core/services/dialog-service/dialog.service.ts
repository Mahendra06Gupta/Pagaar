import { Injectable, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, BehaviorSubject } from 'rxjs';

import { DialogComponent } from '@app/shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  public isRoomAdded = new BehaviorSubject([]);

  constructor(public dialog: MatDialog) {}

  public openDialog<TComponent>(component: Type<TComponent>, dialogArgs?: any): Observable<any> {
    const args: any = {
      autoFocus: false,
      data: {
        component
      }
    };

    if (dialogArgs) {
      args.data.inputArgs = dialogArgs;
    }

    const dialogRef = this.dialog.open(DialogComponent, args);
    dialogRef.updatePosition({ top: '50px'});

    return new Observable(subscriber => {
      dialogRef.afterClosed().subscribe(result => {
          subscriber.next(result ? result : 'close');
      });
    });
  }

  public closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}
