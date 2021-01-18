import { NgModule } from '@angular/core';

import { SharedAppModule } from '../shared';
import { EmployeeProfileLandingComponent } from './components/employee-profile-landing/employee-profile-landing.component';
import { EmployeeProfileRoutingModule } from './employee-profile-routing.module';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';

@NgModule({
  declarations: [
    EmployeeProfileLandingComponent,
    EmployeeProfileComponent
  ],
  imports: [
    SharedAppModule,
    EmployeeProfileRoutingModule
  ]
})
export class EmployeeProfileModule { }
