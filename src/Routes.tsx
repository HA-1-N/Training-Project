import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import DetailPageProduct from './modules/home/DetailPageProduct/DetailPageProduct';
import DetailPageUser from './modules/home/DetailPageUser/DetailPageUser';
import UserPageAdd from './modules/home/UserPageComponent/component/UserPageAdd/UserPageAdd';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductPage = lazy(() => import('./modules/home/ProductPageComponent/ProductPage'));
const UserPage = lazy(() => import('./modules/home/UserPageComponent/UserPage'));
const ProductPageAdd = lazy(() => import('./modules/home/ProductPageComponent/component/ProductPageAdd/ProductPageAdd'));

interface Props { }

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.products} exact component={ProductPage} />
        <Route path={ROUTES.userlist} exact component={UserPage} />
        <Route path={`${ROUTES.userDetail}/:id`} exact component={DetailPageUser} />
        <Route path={`${ROUTES.productDetail}/:id`} exact component={DetailPageProduct} />
        {/* <Route path={ROUTES.addProduct} component={ProductPageAdd} /> */}
        {/* <Route path={ROUTES.addUser} exact component={UserPageAdd} /> */}
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
