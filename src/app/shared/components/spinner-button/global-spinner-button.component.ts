import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
    selector: 'app-global-spinner-button',
    template: `
        <mat-spinner-button [options]="spinnerButtonOptions"></mat-spinner-button>
    `,
    styles: [`
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GlobalSpinnerButtonComponent implements OnChanges {

    @Input() public invalid: boolean;
    @Input() public buttonText: string;
    @Input() public isFormSubmitted: boolean;
    public spinnerButtonOptions: MatProgressButtonOptions;

    constructor() {}

    public ngOnChanges(): void {
        this.spinnerButtonOptions = {
            active: this.isFormSubmitted,
            text: this.buttonText,
            spinnerSize: 18,
            raised: true,
            stroked: false,
            buttonColor: 'primary',
            spinnerColor: 'primary',
            fullWidth: true,
            disabled: this.invalid,
            mode: 'indeterminate',
        };
    }
}
