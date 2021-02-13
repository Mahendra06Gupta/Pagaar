import { NgModule } from '@angular/core';

import { SharedAppModule } from '../shared';
import { JobApplicationListLandingRoutingModule } from './job-application-list-routing.module';
import { JobApplicationListingComponent } from './components/job-application-listing/job-application-listing.component';
import { JobApplicationListExpandableTabComponent } from './components/job-application-list-expandable-tab/job-application-list-expandable-tab.component';
import { JobApplicationListExpandableTabEntryComponent } from './components/job-application-list-expandable-tab/job-application-list-expandable-tab-entry.component';
import { JobApplicationListTabComponent } from './components/job-application-list-tab/job-application-list-tab.component';

@NgModule({
  declarations: [
    JobApplicationListingComponent,
    JobApplicationListExpandableTabComponent,
    JobApplicationListExpandableTabEntryComponent,
    JobApplicationListTabComponent
  ],
  imports: [
    SharedAppModule,
    JobApplicationListLandingRoutingModule
  ]
})
export class JobApplicationListModule { }
