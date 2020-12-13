import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { throwIfAlreadyLoaded } from './module-import-check';
import { SharedAppModule } from '../shared';
import * as fromServices from './services';
import * as fromInterceptors from './interceptors';
import * as fromComponents from './components';

@NgModule({
  declarations: [
    ...fromComponents.components,
  ],
  imports: [
    SharedAppModule,
    RouterModule,
    MatMenuModule,
  ],
  providers: [
    ...fromServices.services,
    ...fromInterceptors.interceptors
  ],
  exports: [
    ...fromComponents.components
  ]
})

export class CoreAppModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreAppModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreAppModule');
  }
}
