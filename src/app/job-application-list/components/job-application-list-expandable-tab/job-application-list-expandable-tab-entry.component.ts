import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-job-application-list-expandable-tab-entry',
    templateUrl: './job-application-list-expandable-tab-entry.component.html'
})
export class JobApplicationListExpandableTabEntryComponent {

    @Input()
    public readonly label: string;

    @Input()
    public readonly value: string;

}
