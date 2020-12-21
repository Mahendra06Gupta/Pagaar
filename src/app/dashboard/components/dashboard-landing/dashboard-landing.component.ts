import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DeviceScreenSizeService } from '@app/core/services';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.scss']
})
export class DashboardLandingComponent implements OnInit {

  public isLargeDevices$: Observable<boolean> = this.deviceSizeBreakpointService.isSmallDevice().pipe(
    map(isSmallDevice => !isSmallDevice)
  );
  public popularSearchLine1 = ['Government', 'Online Typing', 'Work From Home', 'Online Tutoring', 'Bank', 'Delivery Executive', 'Healthcare', 'Software', 'MBA', 'Enginerring'];

  constructor(
    private readonly deviceSizeBreakpointService: DeviceScreenSizeService
  ) { }

  ngOnInit(): void {
  }

}
