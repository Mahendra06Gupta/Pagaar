import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './employee-details-modal.component.html',
    styleUrls: ['./employee-details-modal.component.scss']
})
export class EmployeeDetailsModalComponent implements OnInit {

    public inputArgs: any;

    public constructor(
    ) {}

    public ngOnInit(): void {
        console.log(this.inputArgs);
        this.inputArgs = this.inputArgs.employeeDetail;
    }
}
