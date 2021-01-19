export interface UserData {
    name?: string;
    id?: string;
    email: string;
    type?: string;
    logged: boolean;
    roles: string[];
    token: string;
}

export function getUser(userEntities: UserData[]): UserData {

    for (const user of userEntities) {
        if (user.logged === true) {
            return user;
        }
    }
}

export interface Role {
    roleId: string;
    name: string;
}

export enum RoleType {
    EMPLOYEE = 'Employee',
    EMPLOYER = 'Employer'
}