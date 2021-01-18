import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRoutes } from '@app/app.route-names';
import { EmployeeProfileRoutingPath } from '@app/employee-profile/models/employee-profile-routing.path';

import { DashboardLandingComponent } from './components/dashboard-landing/dashboard-landing.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardLandingComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
