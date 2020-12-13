import { Injectable } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceScreenSizeService {
  public readonly SMALL_DEVICE_DEFINITION = [Breakpoints.Small, Breakpoints.HandsetPortrait];

  constructor(private readonly breakpointObserver: BreakpointObserver) { }

  public isSmallDevice(): Observable<boolean> {
    return this.breakpointObserver.observe(this.SMALL_DEVICE_DEFINITION).pipe(
      map((state: BreakpointState) => state.matches)
    );
  }
}
