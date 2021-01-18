export interface JobReuslt {
    totalItems: number;
    jobs: {
        id: string,
        employer: {
            employerId: string,
            companyName: string
        },
        title: string,
        nature: string,
        totalHiring: number,
        shift: string,
        type: string,
        salary: {
            starting: number,
            upto: number,
            exact: number,
            currency: string
        },
        description: string,
        benefits: [
            string
        ],
        resumeRequired: true,
        applicationDeadline: string,
        postingDate: string,
        interviewType: string,
        location: string
    }[];
    totalPages: number;
    currentPage: number;
}
