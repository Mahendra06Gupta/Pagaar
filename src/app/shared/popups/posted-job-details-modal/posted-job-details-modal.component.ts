import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './posted-job-details-modal.component.html',
    styleUrls: ['./posted-job-details-modal.component.scss']
})
export class PostedJobDetailsModalComponent implements OnInit {

    public inputArgs: any;

    public constructor(
    ) {}

    public ngOnInit(): void {
        console.log(this.inputArgs);
        this.inputArgs = this.inputArgs.transaction;
    }

    public describeTransactionType(transactionType: string, cancelled: boolean): string {
        return cancelled ? transactionType + ' (cancelled)' : transactionType;
    }
}
