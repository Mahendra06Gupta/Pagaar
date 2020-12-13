import { Action } from '@ngrx/store';

import { CLEAR_STORE_AFTER_LOGOUT } from '@app/store/auth/auth.actions';
// import { ClearInvestor } from '@app/store/investor/investor.actions';
// import { ClearProducts } from '@app/store/products/products.actions';
import { RootState } from '@app/store/models/root-state.model';
// import * as fromInvestorReducer from '@app/store/investor/investor.reducer';
// import * as fromProductsReducer from '@app/store/products/products.reducer';

export function rootStoreMetaReducer(reducer): (state, action: Action) => RootState {
    return function crossRootStoreReducer(state, action: Action): RootState {
        switch (action.type) {
            case CLEAR_STORE_AFTER_LOGOUT: {
                // return {
                //     ...state,
                //     investor: fromInvestorReducer.investorReducer(state.investor, new ClearInvestor()),
                //     products: fromProductsReducer.productsReducer(state.products, new ClearProducts()),
                // };
            }
            default: {
                return reducer(state, action);
            }
        }
    };
}
