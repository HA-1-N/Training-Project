import { ACCESS_TOKEN_KEY } from './../../../utils/constants';
import Cookies from 'js-cookie';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AuthToken, IUser } from '../../../models/user';

export interface AuthState {
  auth?: AuthToken;
  user?: IUser;
}

export const setAuthorization = createCustomAction('auth/setAuthorization', (data: AuthToken) => ({
  data,
}));

export const setUserInfo = createCustomAction('auth/setUserInfo', (data: IUser) => ({
  data,
}));

export const setLogout = createCustomAction('auth/setLogout');

const actions = { setAuthorization, setUserInfo, setLogout };

type Action = ActionType<typeof actions>;

export default function reducer(state: AuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.data };
    case getType(setUserInfo):
      return { ...state, user: action.data };
    case getType(setLogout):
      Cookies.remove(ACCESS_TOKEN_KEY);
      return { auth: '', user: null };
    default:
      return state;
  }
}
