import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedAppModule } from '../shared';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import * as fromBookingStore from './store/store';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLandingComponent } from './components/dashboard-landing/dashboard-landing.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardLandingComponent
  ],
  imports: [
    SharedAppModule,
    DashboardRoutingModule,
    EffectsModule.forFeature(fromBookingStore.BOOKINGS_EFFECTS),
    StoreModule.forFeature('booking', fromBookingStore.BOOKINGS_REDUCERS)
  ]
})
export class DashboardModule { }
