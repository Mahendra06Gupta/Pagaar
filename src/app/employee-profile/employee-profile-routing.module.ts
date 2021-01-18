import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeProfileLandingComponent } from './components/employee-profile-landing/employee-profile-landing.component';

import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeProfileRoutingPath, UserProfileTab } from './models/employee-profile-routing.path';

const employeeProfileRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: EmployeeProfileRoutingPath.userProfile,
        component: EmployeeProfileLandingComponent,
        // canActivate: [LoadAccountDetailsGuard, ProductsLoadedGuard],
        children: [
          {
            path: UserProfileTab.USER_PROFILE_ABOUT_ME,
            component: EmployeeProfileComponent,
            // canActivate: [AccountsLoadedGuard, HoldersLoadedGuard],
            pathMatch: 'full'
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeProfileRoutes)],
  exports: [RouterModule]
})
export class EmployeeProfileRoutingModule { }
