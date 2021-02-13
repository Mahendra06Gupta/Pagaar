export enum EmployeeProfileTab {
    EMPLOYEE_PROFILE_ABOUT_ME = 'aboutme',
    EMPLOYEE_PROFILE_RESUME = 'resume'
}

export const EmployeeProfileRoutingPath = {
    employeeProfile: '',
    aboutMe: EmployeeProfileTab.EMPLOYEE_PROFILE_ABOUT_ME,
    resume: EmployeeProfileTab.EMPLOYEE_PROFILE_RESUME
};
