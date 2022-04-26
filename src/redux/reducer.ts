import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import infoReducerProduct, { InfoState } from './../modules/home/redux/InfoReducer';
import infoReducerUser, { } from './../modules/home/redux/InfoReducer';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import filterReducer, { FilterState } from './../modules/home/redux/FilterReducer';
import brandReducer, { BrandState } from '../modules/home/redux/BrandReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  infoProduct: InfoState;
  InfoUser: InfoState;
  filterCategory: FilterState;
  productBrand: BrandState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    infoProduct: infoReducerProduct,
    infoUser: infoReducerUser,
    filterCategory: filterReducer,
    productBrand: brandReducer,
  });
}
