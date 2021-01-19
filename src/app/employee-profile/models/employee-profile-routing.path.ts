export enum EmployeeProfileTab {
    EMPLOYEE_PROFILE_ABOUT_ME = 'aboutme',
    EMPLOYEE_PROFILE_RESUME = 'resume'
}

export const EmployeeProfileRoutingPath = {
    employeeProfile: ':userId',
    aboutMe: `:userId/${EmployeeProfileTab.EMPLOYEE_PROFILE_ABOUT_ME}`,
    resume: `:userId/${EmployeeProfileTab.EMPLOYEE_PROFILE_RESUME}`
};
