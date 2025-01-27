import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@app/core/guards/authenticated.guard';

import { EmployerListingComponent } from './components/employer-listing/employer-listing.component';

const EmployerListRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: '',
        component: EmployerListingComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(EmployerListRoutes)],
  exports: [RouterModule]
})
export class EmployerListLandingRoutingModule { }
