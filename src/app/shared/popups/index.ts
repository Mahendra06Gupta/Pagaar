import { EmployeeDetailsEntryComponent, EmployeeDetailsModalComponent } from './employee-details-modal';
import { EmployerDetailsEntryComponent, EmployerDetailsModalComponent } from './employer-details-modal';
import { PostedJobDetailsEntryComponent, PostedJobDetailsModalComponent } from './posted-job-details-modal';

export * from './posted-job-details-modal/posted-job-details-modal.component';
export * from './posted-job-details-modal/posted-job-details-entry.component';
export * from './employee-details-modal/employee-details-modal.component';
export * from './employee-details-modal/employee-details-entry.component';
export * from './employer-details-modal/employer-details-modal.component';
export * from './employer-details-modal/employer-details-entry.component';

export const popUps = [
    EmployeeDetailsEntryComponent,
    EmployeeDetailsModalComponent,
    PostedJobDetailsModalComponent,
    PostedJobDetailsEntryComponent,
    EmployerDetailsEntryComponent,
    EmployerDetailsModalComponent
];
