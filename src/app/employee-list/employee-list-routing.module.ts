import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@app/core/guards/authenticated.guard';

import { EmployeeListingComponent } from './components/employee-listing/employee-listing.component';

const EmployeeListRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: '',
        component: EmployeeListingComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(EmployeeListRoutes)],
  exports: [RouterModule]
})
export class EmployeeListRoutingModule { }
