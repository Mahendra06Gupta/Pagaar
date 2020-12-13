import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConferenceListComponent } from './components/conference-list/conference-list.component';

const conferenceRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ConferenceListComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(conferenceRoutes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule {
}
