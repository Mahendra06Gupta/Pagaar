import { Go } from '@app/store/router/router.actions';
import { MainRoutes } from '@app/app.route-names';
import { EmployerProfileTab } from './models/employer-profile-routing.path';

const pathSupplier = {
    aboutMe: () => [
        MainRoutes.jobPosting, MainRoutes.employerProfile, EmployerProfileTab.EMPLOYER_PROFILE_ABOUT_ME
    ],
};

export class GoToEmployerActiveAboutMe extends Go {
    public constructor() {
        super({ path: pathSupplier.aboutMe() });
    }
}
