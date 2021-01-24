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
        this.inputArgs = this.inputArgs.jobs;
    }
}
