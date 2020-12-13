export interface LoginApiReuestModel {
    email: string;
    password: string;
}

export interface CreateAccountApiRequestModel {
    email: string;
    name: string;
    password: string;
    roles: string[];
}
