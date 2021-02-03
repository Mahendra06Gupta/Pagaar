import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-employee-details-entry',
    templateUrl: './employee-details-entry.component.html',
    styleUrls: ['./employee-details-entry.component.scss']
})
export class EmployeeDetailsEntryComponent {

    @Input()
    public readonly label: string;

    @Input()
    public readonly value: string;
}
