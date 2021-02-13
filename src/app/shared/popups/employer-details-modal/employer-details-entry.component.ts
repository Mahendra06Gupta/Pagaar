import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-employer-details-entry',
    templateUrl: './employer-details-entry.component.html',
    styleUrls: ['./employer-details-entry.component.scss']
})
export class EmployerDetailsEntryComponent {

    @Input()
    public readonly label: string;

    @Input()
    public readonly value: string;
}
