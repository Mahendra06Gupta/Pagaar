import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-job-post-list-expandable-tab-entry',
    templateUrl: './job-post-list-expandable-tab-entry.component.html'
})
export class JobListExpandableTabEntryComponent {

    @Input()
    public readonly label: string;

    @Input()
    public readonly value: string;

}
