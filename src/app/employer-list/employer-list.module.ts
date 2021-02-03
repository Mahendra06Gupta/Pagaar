import { NgModule } from '@angular/core';

import { SharedAppModule } from '../shared';
import { EmployerListLandingRoutingModule as EmployerListRoutingModule } from './employer-list-routing.module';
import { EmployerListingComponent } from './components/employer-listing/employer-listing.component';
import { EmployerListExpandableTabComponent } from './components/employer-list-expandable-tab/employer-list-expandable-tab.component';
import { EmployerListExpandableTabEntryComponent } from './components/employer-list-expandable-tab/employer-list-expandable-tab-entry.component';
import { EmployerListTabComponent } from './components/employer-list-tab/employer-list-tab.component';

@NgModule({
  declarations: [
    EmployerListingComponent,
    EmployerListExpandableTabComponent,
    EmployerListExpandableTabEntryComponent,
    EmployerListTabComponent
  ],
  imports: [
    SharedAppModule,
    EmployerListRoutingModule
  ]
})
export class EmployerListModule { }
