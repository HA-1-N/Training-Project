import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { InfoUser } from "../../../models/infouser";
import { IProduct } from './../../../models/product';

export interface InfoState {
    infoProduct?: IProduct;
    infoUser?: InfoUser;
}

export const setInfoProduct = createCustomAction('info/setInfoProduct', (data: IProduct) => ({
    data,
}));

export const setInfoUser = createCustomAction('info/setInfoUser', (data: InfoUser) => ({
    data,
}))

const action = { setInfoProduct, setInfoUser };

type Action = ActionType<typeof action>

export default function reducer(state: InfoState = {}, action: Action) {
    switch (action.type) {
        case getType(setInfoProduct):
            return { ...state, infoProduct: action.data };
        case getType(setInfoUser):
            return { ...state, infoUser: action.data };
        default:
            return state;

    }
}