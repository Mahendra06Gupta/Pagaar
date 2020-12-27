import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedAppModule } from '../shared';
import { UserProfileLandingComponent } from './components/user-profile-landing/user-profile-landing.component';
// import * as fromBookingStore from './store/store';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    UserProfileLandingComponent,
    UserProfileComponent
  ],
  imports: [
    SharedAppModule,
    UserProfileRoutingModule,
    // EffectsModule.forFeature(fromBookingStore.BOOKINGS_EFFECTS),
    // StoreModule.forFeature('dashboard', fromBookingStore.BOOKINGS_REDUCERS)
  ]
})
export class UserProfileModule { }
