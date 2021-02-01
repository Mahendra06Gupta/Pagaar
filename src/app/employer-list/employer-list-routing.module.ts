import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@app/core/guards/authenticated.guard';

import { EmployerListingComponent } from './components/employer-listing/employer-listing.component';

const JobPostingRoutes: Routes = [
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
  imports: [RouterModule.forChild(JobPostingRoutes)],
  exports: [RouterModule]
})
export class JobPostingLandingRoutingModule { }
