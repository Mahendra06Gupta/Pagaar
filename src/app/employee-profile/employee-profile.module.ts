import { NgModule } from '@angular/core';

import { SharedAppModule } from '../shared';
import { UserProfileLandingComponent } from './components/employee-profile-landing/employee-profile-landing.component';
import { UserProfileRoutingModule } from './employee-profile-routing.module';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';

@NgModule({
  declarations: [
    UserProfileLandingComponent,
    EmployeeProfileComponent
  ],
  imports: [
    SharedAppModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
