import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { IBrand } from '../../../models/productBrand';

export interface BrandState {
    productBrand?: IBrand;
}

export const setBrand = createCustomAction('brand/setBrand', (data: IBrand) => ({
    data,
}));

const action = { setBrand };

type Action = ActionType<typeof action>

export default function reducer(state: BrandState = {}, action: Action) {
    switch (action.type) {
        case getType(setBrand):
            return { ...state, productBrand: action.data };
        default:
            return state;
    }
}