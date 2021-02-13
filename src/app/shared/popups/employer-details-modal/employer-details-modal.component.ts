import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './employer-details-modal.component.html',
    styleUrls: ['./employer-details-modal.component.scss']
})
export class EmployerDetailsModalComponent implements OnInit {

    public inputArgs: any;

    public constructor(
    ) {}

    public ngOnInit(): void {
        this.inputArgs = this.inputArgs.res;
    }
}
