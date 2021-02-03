import { EmployeeDetailsEntryComponent } from './employee-details-modal';
import { EmployeeDetailsModalComponent } from './employee-details-modal/employee-details-modal.component';
import { PostedJobDetailsEntryComponent, PostedJobDetailsModalComponent } from './posted-job-details-modal';

export * from './posted-job-details-modal/posted-job-details-modal.component';
export * from './posted-job-details-modal/posted-job-details-entry.component';
export * from './employee-details-modal/employee-details-modal.component';
export * from './employee-details-modal/employee-details-entry.component';

export const popUps = [
    EmployeeDetailsEntryComponent,
    EmployeeDetailsModalComponent,
    PostedJobDetailsModalComponent,
    PostedJobDetailsEntryComponent
];
