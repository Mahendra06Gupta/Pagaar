import { Go, GoUsingActiveId, GoUsingActiveUserId } from '@app/store/router/router.actions';
import { MainRoutes } from '@app/app.route-names';

const pathSupplier = {
    jobApplicationListing: (id: string) => [MainRoutes.jobPosting, id, MainRoutes.jobApplicationListing]
};

export class GoToApplicationListing extends GoUsingActiveId {
    public constructor() {
        super({ pathSupplier: pathSupplier.jobApplicationListing });
    }
}
