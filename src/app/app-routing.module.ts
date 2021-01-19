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
        redirectTo: MainRoutes.login,
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
        path: MainRoutes.jobPosting,
        loadChildren: () => import('./job-posting/job-posting.module').then(m => m.JobPostingModule)
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
                loadChildren: () => isLoggedInUserEmployee() ? import ('./employee-profile/employee-profile.module').then(m => m.EmployeeProfileModule) : import ('./employer-profile/employer-profile.module').then(m => m.EmployerProfileModule)
              }
            ]
          },
        ]
      },
    ]
  }
];

@NgModule({
  providers: [
    AuthenticatedGuard
  ],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

function isLoggedInUserEmployee(): boolean {
  return JSON.parse(localStorage.getItem('role')).includes('EMPLOYEE');
}

function isLoggedInUserAdmin(): boolean {
  return JSON.parse(localStorage.getItem('role')).includes('ADMIN');
}
