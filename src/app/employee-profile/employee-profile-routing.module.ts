import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@app/core/guards/authenticated.guard';

import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeProfileTab } from './models/employee-profile-routing.path';

const employeeProfileRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: EmployeeProfileTab.EMPLOYEE_PROFILE_ABOUT_ME,
        component: EmployeeProfileComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeProfileRoutes)],
  exports: [RouterModule]
})
export class EmployeeProfileRoutingModule { }
