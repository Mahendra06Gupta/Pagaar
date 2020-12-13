import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  public contextMenuType = 'push';
  public position = 'end';
  public isLargeDevice = false;
  private isOpenState = false;
  private readonly  LARGE_DEVICE_RULE = 'gt-sm';

  constructor(private readonly media: MediaObserver) {

    this.media.asObservable().subscribe(() => {
      this.isOpenState = false;
      this.isLargeDevice = this.media.isActive(this.LARGE_DEVICE_RULE);

      if (this.isLargeDevice) {
        this.contextMenuType = 'side';
        this.position = 'start';
      } else {
        this.contextMenuType = 'over';
        this.position = 'start';
      }

    });
  }

  public get isOpen(): boolean {
    return this.isLargeDevice || this.isOpenState;
  }

  public toggleSideMenu(): void {
    if (!this.isLargeDevice) {
      this.isOpenState = !this.isOpenState;
    }
  }

}
