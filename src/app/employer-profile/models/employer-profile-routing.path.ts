import { MainRoutes } from '@app/app.route-names';

export enum EmployerProfileTab {
    EMPLOYER_PROFILE_ABOUT_ME = 'aboutme',
    EMPLOYER_PROFILE_RESUME = 'resume'
}

export const EmployerProfileRoutingPath = {
    employerProfile: '',
    aboutMe: `job-posting/${MainRoutes.employerProfile}/${EmployerProfileTab.EMPLOYER_PROFILE_ABOUT_ME}`,
    resume: `job-posting/${MainRoutes.employerProfile}/${EmployerProfileTab.EMPLOYER_PROFILE_RESUME}`
};
