import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-posted-job-details-entry',
    templateUrl: './posted-job-details-entry.component.html',
    styleUrls: ['./posted-job-details-entry.component.scss']
})
export class PostedJobDetailsEntryComponent {

    @Input()
    public readonly label: string;

    @Input()
    public readonly value: string;
}
