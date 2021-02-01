import { Go } from '@app/store/router/router.actions';
import { MainRoutes } from '@app/app.route-names';

const pathSupplier = {
    employerListing: () => [MainRoutes.jobPosting, MainRoutes.employerListing]
};

export class GoToEmployerListing extends Go {
    public constructor() {
        super({ path: pathSupplier.employerListing() });
    }
}
