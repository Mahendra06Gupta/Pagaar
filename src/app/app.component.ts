import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '@app/store';
import { ContextMenuService } from './core/services/context-menu/context-menu.service';
import { isIamLoginPageORCreateAccountPage } from '@app/store/router/router.selectors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pagaar-app';
  public isLoginPage$: Observable<boolean> = this.store$.select(isIamLoginPageORCreateAccountPage);

  constructor(
    public readonly contextMenuService: ContextMenuService,
    public readonly store$: Store<RootState>,
  ) {}
}
