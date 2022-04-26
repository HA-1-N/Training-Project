import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router';
import clsx from 'clsx';

import { setLogout } from '../../auth/redux/authReducer';
import { ROUTES } from '../../../configs/routes';
import styles from '../css/HomePage.module.css';
import Navbar from '../HomePageComponent/Navbar';
import ProductPage from '../ProductPageComponent/ProductPage';
import Sidebar from '../HomePageComponent/Sidebar';
import SidebarPage from '../HomePageComponent/SidebarComponent/SidebarPage';

interface Props { }

const HomePage = (props: Props) => {

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(setLogout());
    dispatch(replace(ROUTES.login));
  }

  return <>
    <div className={clsx(styles.main)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.navbar)}>
          <Navbar />
        </div>
        <div className={clsx(styles.sidebar)}>
          {/* <Sidebar /> */}
          <SidebarPage />
        </div>
      </div>
    </div>
  </>;
};

export default HomePage;
