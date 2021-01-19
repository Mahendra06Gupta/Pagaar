export interface EmployeeDetailApiReuestModel {
    name: string;
    email: string;
    dob: string;
    address: string;
    contactNumber: string;
    qualificationDoc: string;
    maritalStatus: string;
    nationality: string;
    idProofDoc: string;
    skills: string[];
    hobbies: string[];
    experience: Experience;
}

export interface Experience {
    numberOfYears: string;
    jobDetails: {
        companyName: string;
        designation: string;
    }[];
}

export interface EmployeesDetail extends EmployeeDetailApiReuestModel {
    id: string;
}
