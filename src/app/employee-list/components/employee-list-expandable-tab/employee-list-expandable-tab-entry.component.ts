import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-employee-list-expandable-tab-entry',
    templateUrl: './employee-list-expandable-tab-entry.component.html'
})
export class EmployeeListExpandableTabEntryComponent {

    @Input()
    public readonly label: string;

    @Input()
    public readonly value: string;

}
