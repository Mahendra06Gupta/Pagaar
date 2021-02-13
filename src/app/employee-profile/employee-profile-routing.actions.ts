import { Go } from '@app/store/router/router.actions';
import { MainRoutes } from '@app/app.route-names';
import { EmployeeProfileTab } from './models/employee-profile-routing.path';

const pathSupplier = {
    aboutMe: () => [
        MainRoutes.employeeProfile, EmployeeProfileTab.EMPLOYEE_PROFILE_ABOUT_ME
    ],
};

export class GoToActiveAboutMe extends Go {
    public constructor() {
        super({ path: pathSupplier.aboutMe() });
    }
}
