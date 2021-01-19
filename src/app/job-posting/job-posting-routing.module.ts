import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRoutes } from '@app/app.route-names';
import { AuthenticatedGuard } from '@app/core/guards/authenticated.guard';

import { JobPostingLandingComponent } from './components/job-posting-landing/job-posting-landing.component';
import { JobPostingListingComponent } from './components/job-posting-listing/job-posting-listing.component';
// import { JobPostingListingComponent } from './components/job-posting-listing/job-posting-listing.component';
import { JobPostingComponent } from './components/job-posting/job-posting.component';
import { EmployeeProfileRoutingPath, JobPostingTab } from './models/job-posting-routing.path';

const JobPostingRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: '',
        component: JobPostingComponent,
        children: [
          {
            path: EmployeeProfileRoutingPath.jobPostingList,
            component: JobPostingListingComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(JobPostingRoutes)],
  exports: [RouterModule]
})
export class JobPostingLandingRoutingModule { }
