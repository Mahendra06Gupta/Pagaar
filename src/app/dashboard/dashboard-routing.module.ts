import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRoutes } from '@app/app.route-names';
import { AuthenticatedGuard } from '@app/core/guards/authenticated.guard';
import { EmployeeProfileRoutingPath } from '@app/employee-profile/models/employee-profile-routing.path';

import { DashboardLandingComponent } from './components/dashboard-landing/dashboard-landing.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedGuard],
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
