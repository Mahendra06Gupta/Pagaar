import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from '@core/components/login-page/login-page.component';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';
import { MainRoutes } from '@app/app.route-names';
import { SignUpComponent } from '@core/components/sign-up/sign-up.component';
import { DashboardComponent } from '@core/components/dashboard/dashboard.component';
import { EmployeeProfileRoutingPath } from './employee-profile/models/employee-profile-routing.path';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: MainRoutes.dashboard,
        pathMatch: 'full',
      },
      {
        path: MainRoutes.login,
        component: LoginPageComponent,
      },
      {
        path: MainRoutes.createAccount,
        component: SignUpComponent,
      },
      {
        path: '',
        children: [
          {
            path: '',
            component: DashboardComponent,
            children: [
              {
                path: MainRoutes.dashboard,
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
              },
              {
                path: EmployeeProfileRoutingPath.userProfile,
                loadChildren: () => import ('./employee-profile/employee-profile.module').then(m => m.UserProfileModule)
              }
            ]
          }
        ]
      },
      // {
      //   path: MainRoutes.dashboard,
      //   component: DashboardComponent,
      //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      // }
    ]
  }
];

// const routes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: '',
//         redirectTo: MainRoutes.dashboard,
//         pathMatch: 'full',
//       },
//       {

//       },
//       {
//         path: MainRoutes.userProfile,
//         loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
//       }
//     ]
//   },
  // {
  //   path: '',
  //   canActivate: [AuthenticatedGuard],
  //   canActivateChild: [AuthenticatedGuard],
  //   children: [
  //     {
  //       path: '',
  //       component: DashboardComponent,
  //       children: [
  //         {
  //           path: MainRoutes.conference,
  //           loadChildren: () => import('@app/dashboard/components/conference/conference.module').then(m => m.ConferenceModule)
  //         },
  //       ]
  //     }
  //   ]
  // },
// ];

@NgModule({
  providers: [
    AuthenticatedGuard
  ],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
