import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-employer-list-expandable-tab-entry',
    templateUrl: './employer-list-expandable-tab-entry.component.html'
})
export class EmployerListExpandableTabEntryComponent {

    @Input()
    public readonly label: string;

    @Input()
    public readonly value: string;

}
