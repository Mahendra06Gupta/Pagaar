import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerProfileLandingComponent } from './components/employer-profile-landing/employer-profile-landing.component';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { EmployeeProfileRoutingPath, UserProfileTab } from './models/employer-profile-routing.path';

const EmployerProfileRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: EmployeeProfileRoutingPath.userProfile,
        component: EmployerProfileLandingComponent,
        // canActivate: [LoadAccountDetailsGuard, ProductsLoadedGuard],
        children: [
          {
            path: UserProfileTab.USER_PROFILE_ABOUT_ME,
            component: EmployerProfileComponent,
            // canActivate: [AccountsLoadedGuard, HoldersLoadedGuard],
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
