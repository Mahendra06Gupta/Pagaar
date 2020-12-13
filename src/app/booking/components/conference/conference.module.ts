import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceRoutingModule } from './conference-routing.module';
import { ConferenceListComponent } from './components/conference-list/conference-list.component';
import { SharedAppModule } from '@app/shared';
import { VcIdListTabComponent } from './components/vc-id-list-tab/vc-id-list-tab.component';
import { VcIdListExpandableTabComponent } from './components/vcId-list-expandable-tab/vcId-list-expandable-tab.component';
import { VcIdListExpandableTabEntryComponent } from './components/vcId-list-expandable-tab/vcId-list-expandable-tab-entry.component';

@NgModule({
  declarations: [
    ConferenceListComponent,
    VcIdListTabComponent,
    VcIdListExpandableTabComponent,
    VcIdListExpandableTabEntryComponent
  ],
  imports: [
    SharedAppModule,
    CommonModule,
    ConferenceRoutingModule
  ],
})
export class ConferenceModule { }
