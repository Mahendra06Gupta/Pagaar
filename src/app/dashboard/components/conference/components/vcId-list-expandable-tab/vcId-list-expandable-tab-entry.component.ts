import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-vcid-list-expandable-tab-entry',
    templateUrl: './vcId-list-expandable-tab-entry.component.html'
})
export class VcIdListExpandableTabEntryComponent {

    @Input()
    public readonly label: string;

    @Input()
    public readonly value: string;

}
