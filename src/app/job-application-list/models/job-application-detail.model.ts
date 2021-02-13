export interface JobApplicationList {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    items: JobApplicationListItem[];
}

export interface JobApplicationListItem {
    id: string;
    employer: {
        employerId: string,
        companyName: string
    };
    employee: {
        employeeId: string,
        name: string
    };
    job: {
        jobId: string,
        title: string
    };
    applicationDate: string;
}
