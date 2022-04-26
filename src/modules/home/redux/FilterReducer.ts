import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { IFilterCategory } from "../../../models/filterproductcategory";

export interface FilterState {
    filterCategory?: IFilterCategory;
}

export const setFilterCategory = createCustomAction('filter/setFilterCategory', (data: IFilterCategory) => ({
    data,
}));

const action = { setFilterCategory };

type Action = ActionType<typeof action>

export default function reducer(state: FilterState = {}, action: Action) {
    switch (action.type) {
        case getType(setFilterCategory):
            return { ...state, filterCategory: action.data };
        default:
            return state;
    }
}