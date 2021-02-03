import { NgModule } from '@angular/core';

import { SharedAppModule } from '../shared';
import { EmployeeListLandingRoutingModule as EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListingComponent } from './components/employee-listing/employee-listing.component';
import { EmployeeListExpandableTabComponent } from './components/employee-list-expandable-tab/employee-list-expandable-tab.component';
import { EmployeeListExpandableTabEntryComponent } from './components/employee-list-expandable-tab/employee-list-expandable-tab-entry.component';
import { EmployeeListTabComponent } from './components/employee-list-tab/employee-list-tab.component';

@NgModule({
  declarations: [
    EmployeeListingComponent,
    EmployeeListExpandableTabComponent,
    EmployeeListExpandableTabEntryComponent,
    EmployeeListTabComponent
  ],
  imports: [
    SharedAppModule,
    EmployeeListRoutingModule
  ]
})
export class EmployeeListModule { }
