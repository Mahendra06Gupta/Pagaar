import { GoUsingActiveUserId } from '@app/store/router/router.actions';
import { MainRoutes } from '@app/app.route-names';
import { EmployeeProfileTab } from './models/employee-profile-routing.path';

const pathSupplier = {
    aboutMe: (userId: string) => [
        MainRoutes.employeeProfile, userId, EmployeeProfileTab.EMPLOYEE_PROFILE_ABOUT_ME
    ],
};

export class GoToActiveAboutMe extends GoUsingActiveUserId {
    public constructor() {
        super({ pathSupplier: pathSupplier.aboutMe });
    }
}
