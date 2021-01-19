import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@app/core/guards/authenticated.guard';

import { JobPostingLandingComponent } from './components/job-posting-landing/job-posting-landing.component';
// import { JobPostingListingComponent } from './components/job-posting-listing/job-posting-listing.component';
import { JobPostingComponent } from './components/job-posting/job-posting.component';
import { JobPostingTab } from './models/job-posting-routing.path';

const JobPostingRoutes: Routes = [
  {
    path: '',
    component: JobPostingLandingComponent,
    canActivateChild: [AuthenticatedGuard],
    children: [
      { path: '',
        pathMatch: 'full',
        redirectTo: JobPostingTab.JOB_POSTING
      },
      {
        path: JobPostingTab.JOB_POSTING,
        component: JobPostingComponent
      },
      // {
      //   path: JobPostingTab.ALL_JOB_POSTING_LIST,
      //   component: JobPostingListingComponent
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(JobPostingRoutes)],
  exports: [RouterModule]
})
export class JobPostingLandingRoutingModule { }
