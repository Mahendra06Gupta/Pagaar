import { GoUsingActiveUserId } from '@app/store/router/router.actions';
import { MainRoutes } from '@app/app.route-names';
import { EmployerProfileTab } from './models/employer-profile-routing.path';

const pathSupplier = {
    aboutMe: (userId: string) => [
        MainRoutes.employerProfile, userId, EmployerProfileTab.EMPLOYER_PROFILE_ABOUT_ME
    ],
};

export class GoToEmployerActiveAboutMe extends GoUsingActiveUserId {
    public constructor() {
        super({ pathSupplier: pathSupplier.aboutMe });
    }
}
