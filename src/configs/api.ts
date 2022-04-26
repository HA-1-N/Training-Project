import { APIHost, APIHostAdmin } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
  products,
  users,
  categories,
  vendors,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/authentication`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.products) {
    return `${APIHost}/products`;
  } else if (service === APIService.categories) {
    return `${APIHost}/categories`;
  } else if (service === APIService.users) {
    return `${APIHostAdmin}/users`;
  } else if (service === APIService.vendors) {
    return `${APIHostAdmin}/vendors`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  getProducts: `${getBaseUrl(APIService.products)}/list`,
  getUsers: `${getBaseUrl(APIService.users)}/list`,
  getVendors: `${getBaseUrl(APIService.vendors)}/list`,
  getFilterCategory: `${getBaseUrl(APIService.categories)}/list`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
};
