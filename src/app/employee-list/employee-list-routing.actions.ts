import { Go } from '@app/store/router/router.actions';
import { MainRoutes } from '@app/app.route-names';

const pathSupplier = {
    employeeListing: () => [MainRoutes.jobPosting, MainRoutes.employeeListing]
};

export class GoToEmployeeListing extends Go {
    public constructor() {
        super({ path: pathSupplier.employeeListing() });
    }
}
