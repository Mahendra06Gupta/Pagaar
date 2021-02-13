import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from '@core/components/login-page/login-page.component';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';
import { MainRoutes } from '@app/app.route-names';
import { SignUpComponent } from '@core/components/sign-up/sign-up.component';
import { DashboardComponent } from '@core/components/dashboard/dashboard.component';
import { JobPostingDashboardComponent } from './core/components';
import { EmployerProfileRoutingPath } from './employer-profile/models/employer-profile-routing.path';

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
        component: JobPostingDashboardComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./job-posting/job-posting.module').then(m => m.JobPostingModule)
          },
          {
            path: MainRoutes.createAdminAccount,
            component: SignUpComponent
          },
          {
            path: MainRoutes.employerProfile,
            children: [
              {
                path: EmployerProfileRoutingPath.employerProfile,
                loadChildren: () => import ('./employer-profile/employer-profile.module').then(m => m.EmployerProfileModule)
              }
            ]
          },
          {
            path: MainRoutes.employerListing,
            children: [
              {
                path: '',
                loadChildren: () => import('./employer-list/employer-list.module').then(m => m.EmployerListModule)
              },
            ]
          },
          {
            path: MainRoutes.employeeListing,
            children: [
              {
                path: '',
                loadChildren: () => import('./employee-list/employee-list.module').then(m => m.EmployeeListModule)
              },
            ]
          },
          {
            path: `:id/${MainRoutes.jobApplicationListing}`,
            children: [
              {
                path: '',
                loadChildren: () => import('./job-application-list/job-application-list.module').then(m => m.JobApplicationListModule)
              },
            ]
          },
        ]
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
                path: MainRoutes.appliedJob,
                loadChildren: () => import('./job-application-list/job-application-list.module').then(m => m.JobApplicationListModule)
              },
              {
                path: MainRoutes.employeeProfile,
                loadChildren: () => import ('./employee-profile/employee-profile.module').then(m => m.EmployeeProfileModule)
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
