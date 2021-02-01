import { MainRoutes } from '@app/app.route-names';

export enum EmployerProfileTab {
    EMPLOYER_PROFILE_ABOUT_ME = 'aboutme',
    EMPLOYER_PROFILE_RESUME = 'resume'
}

export const EmployerProfileRoutingPath = {
    employerProfile: ':userId',
    aboutMe: `job-posting/${MainRoutes.employerProfile}/:userId/${EmployerProfileTab.EMPLOYER_PROFILE_ABOUT_ME}`,
    resume: `job-posting/${MainRoutes.employerProfile}/:userId/${EmployerProfileTab.EMPLOYER_PROFILE_RESUME}`
};
