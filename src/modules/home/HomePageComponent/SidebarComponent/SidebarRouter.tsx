import Cookies from 'js-cookie';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteProps } from 'react-router-dom';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import ProductPage from '../../ProductPageComponent/ProductPage';
import UserPage from '../../UserPageComponent/UserPage';
import SidebarPage from './SidebarPage';

interface Props extends RouteProps { }

const SidebarRouter = () => {
    const auth = Cookies.get(ACCESS_TOKEN_KEY);

    // if (auth) {
    // }
    return (
        <Router>
            <SidebarPage />
            <Switch>
                <Route path='/catalog/products' exact component={ProductPage} />
                <Route path='/user/userlist' exact component={UserPage} />
            </Switch>
        </Router>
    );
};

export default SidebarRouter;