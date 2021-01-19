import { NgModule } from '@angular/core';

import { SharedAppModule } from '../shared';
import { JobPostingLandingRoutingModule } from './job-posting-routing.module';
import { JobPostingLandingComponent } from './components/job-posting-landing/job-posting-landing.component';
import { JobPostingComponent } from './components/job-posting/job-posting.component';
// import { JobPostingListingComponent } from './components/job-posting-listing/job-posting-listing.component';
// import { JobPostListExpandableTabComponent } from './components/job-post-list-expandable-tab/job-post-list-expandable-tab.component';
// import { JobListExpandableTabEntryComponent } from './components/job-post-list-expandable-tab/job-post-list-expandable-tab-entry.component';
// import { JobPOSTListTabComponent } from './components/job-post-list-tab/job-post-list-tab.component';

@NgModule({
  declarations: [
    JobPostingLandingComponent,
    JobPostingComponent,
    // JobPostingListingComponent,
    // JobPostListExpandableTabComponent,
    // JobListExpandableTabEntryComponent,
    // JobPOSTListTabComponent
  ],
  imports: [
    SharedAppModule,
    JobPostingLandingRoutingModule
  ]
})
export class JobPostingModule { }
