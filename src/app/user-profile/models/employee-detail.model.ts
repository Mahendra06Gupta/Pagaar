export interface EmployeeDetailApiReuestModel {
    name: string;
    email: string;
    dob: string;
    address: string;
    contactNumber: string;
    qualification: string;
    maritalStatus: string;
    nationality: string;
    idProof: string;
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

export interface EmployeeDetail extends EmployeeDetailApiReuestModel {
    id: string;
}

export interface EmployerDetailApiRequestModel {
    email: string;
    phoneNumber: string;
    country: string;
    pincode: string;
    companyName: string;
    companySize: string;
    businessNature: string;
}

export interface EmployersDetail extends EmployerDetailApiRequestModel {
    id: string;
}
