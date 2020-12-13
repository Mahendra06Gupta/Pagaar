import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { MainRoutes } from '@app/app.route-names';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BookingListComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
