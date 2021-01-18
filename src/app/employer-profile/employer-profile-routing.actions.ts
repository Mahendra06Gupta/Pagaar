import { GoUsingActiveUserId } from '@app/store/router/router.actions';
import { MainRoutes } from '@app/app.route-names';
import { UserProfileTab } from './models/employer-profile-routing.path';

const pathSupplier = {
    aboutMe: (userId: string) => [
        MainRoutes.userProfile, userId, UserProfileTab.USER_PROFILE_ABOUT_ME
    ],
};

export class GoToActiveAboutMe extends GoUsingActiveUserId {
    public constructor() {
        super({ pathSupplier: pathSupplier.aboutMe });
    }
}
