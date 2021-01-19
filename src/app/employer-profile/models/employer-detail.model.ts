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

export function getEmployer(employerEntities: EmployersDetail[], email: string): EmployersDetail {

    for (const employer of employerEntities) {
        if (employer.email === email) {
            return employer;
        }
    }
}
