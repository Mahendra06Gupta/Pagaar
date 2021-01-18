import { Component } from '@angular/core';

@Component({
  selector: 'app-global-spinner',
  template: `
    <div class="global-spinner-container">
      <mat-spinner class="global" diameter="75"></mat-spinner>
    </div>
  `,
  styles: [`
    mat-spinner {
      margin: 0 auto;
      top: 50%;
    }

    .global-spinner-container {
      opacity: 0.7;
      background-color: ghostwhite;
      width: 100%;
      height: 100%;
      z-index: 1000;
      top: 0;
      left: 0;
      position: fixed;
    }
  `]
})

export class GlobalSpinnerComponent {
}
