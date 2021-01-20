import { Go } from '@app/store/router/router.actions';
import { MainRoutes } from '@app/app.route-names';

const pathSupplier = {
    jobPosting: () => [MainRoutes.jobPosting],
    jobPostingListing: () => [MainRoutes.jobPosting, MainRoutes.jobPostingListing],
};

export class GoToJobPosting extends Go {
    public constructor() {
        super({ path: pathSupplier.jobPosting() });
    }
}

export class GoToJobPostingListing extends Go {
    public constructor() {
        super({path: pathSupplier.jobPostingListing()});
    }
}
