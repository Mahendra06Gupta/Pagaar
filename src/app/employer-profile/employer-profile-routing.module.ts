import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@app/core/guards/authenticated.guard';

import { EmployerProfileLandingComponent } from './components/employer-profile-landing/employer-profile-landing.component';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { EmployeeProfileRoutingPath, EmployerProfileTab } from './models/employer-profile-routing.path';

const EmployerProfileRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: EmployeeProfileRoutingPath.userProfile,
        component: EmployerProfileLandingComponent,
        children: [
          {
            path: EmployerProfileTab.EMPLOYER_PROFILE_ABOUT_ME,
            component: EmployerProfileComponent,
            pathMatch: 'full'
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(EmployerProfileRoutes)],
  exports: [RouterModule]
})
export class EmployerProfileRoutingModule { }
