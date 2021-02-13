import { JobApplicationListItem } from './job-application-detail.model';

export const dummyDataSet: JobApplicationListItem[] = [
    {
        id: '6012dfd608c73613585f0da6',
        employer: {
            employerId: '5fd4b935a76031739ededa38',
            companyName: 'Oracle'
        },
        employee: {
            employeeId: '5fe0aa5a53e6a858ec806172',
            name: 'Employee'
        },
        job: {
            jobId: '600270da9e048220ee4b4822',
            title: 'Java Developer'
        },
        applicationDate: '28/01/2021 12:00:00'
    },
    {
        id: '6013936390adf6118eee66cd',
        employer: {
            employerId: '5fd4b935a76031739ededa38',
            companyName: 'Oracle'
        },
        employee: {
            employeeId: '5fe0aa5a53e6a858ec806172',
            name: 'Employee'
        },
        job: {
            jobId: '600270da9e048220ee4b4822',
            title: 'Java Developer'
        },
        applicationDate: '29/01/2021 04:47:31'
    }
];

export const dummyDataForEmployerById = {
    id: '5fd4b935a76031739ededa38',
    email: 'employer@gmail.com',
    phoneNumber: '1111111',
    pincode: '209009',
    country: 'India',
    companyName: 'Oracle',
    companySize: '500000',
    businessNature: 'EXTRACTIVE_INDUSTRY'
};

