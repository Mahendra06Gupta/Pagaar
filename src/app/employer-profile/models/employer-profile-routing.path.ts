export enum EmployerProfileTab {
    EMPLOYER_PROFILE_ABOUT_ME = 'aboutme',
    EMPLOYER_PROFILE_RESUME = 'resume'
}

export const EmployeeProfileRoutingPath = {
    userProfile: ':userId',
    aboutMe: `:userId/${EmployerProfileTab.EMPLOYER_PROFILE_ABOUT_ME}`,
    resume: `:userId/${EmployerProfileTab.EMPLOYER_PROFILE_RESUME}`
};
