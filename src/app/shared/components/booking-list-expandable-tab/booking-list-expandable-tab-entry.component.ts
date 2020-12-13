import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-booking-list-expandable-tab-entry',
    templateUrl: './booking-list-expandable-tab-entry.component.html'
})
export class BookingListExpandableTabEntryComponent {

    @Input()
    public readonly label: string;

    @Input()
    public readonly value: string;

}
