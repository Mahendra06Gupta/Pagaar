import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@app/core/guards/authenticated.guard';

import { JobApplicationListingComponent } from './components/job-application-listing/job-application-listing.component';

const JobApplicationListRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: '',
        component: JobApplicationListingComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(JobApplicationListRoutes)],
  exports: [RouterModule]
})
export class JobApplicationListLandingRoutingModule { }
