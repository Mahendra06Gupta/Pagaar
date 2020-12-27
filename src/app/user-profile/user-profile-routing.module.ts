import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileLandingComponent } from './components/user-profile-landing/user-profile-landing.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileRoutingPath, UserProfileTab } from './models/user-profile-routing.path';

const userProfileRoutes: Routes = [
  {
    path: '',
    // canActivate: [AccountsLoadedGuard],
    children: [
      {
        path: UserProfileRoutingPath.userProfile,
        component: UserProfileLandingComponent,
        // canActivate: [LoadAccountDetailsGuard, ProductsLoadedGuard],
        children: [
          {
            path: UserProfileTab.USER_PROFILE_ABOUT_ME,
            component: UserProfileComponent,
            // canActivate: [AccountsLoadedGuard, HoldersLoadedGuard],
            pathMatch: 'full'
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userProfileRoutes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
