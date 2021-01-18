import { NgModule } from '@angular/core';

import { SharedAppModule } from '../shared';
import { EmployerProfileLandingComponent } from './components/employer-profile-landing/employer-profile-landing.component';
import { EmployerProfileRoutingModule } from './employer-profile-routing.module';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';

@NgModule({
  declarations: [
    EmployerProfileLandingComponent,
    EmployerProfileComponent
  ],
  imports: [
    SharedAppModule,
    EmployerProfileRoutingModule
  ]
})
export class EmployerProfileModule { }
