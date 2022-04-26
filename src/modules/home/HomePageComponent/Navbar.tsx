import React, { useState } from 'react';
import clsx from 'clsx';

import styles from '../css/Navbar.module.css';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setLogout } from '../../auth/redux/authReducer';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';

const Navbar = () => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const handleClickShow = () => {
        setShowAccountMenu(!showAccountMenu);
    }

    const onLogout = () => {
        dispatch(setLogout());
        dispatch(replace(ROUTES.login));
    }

    return (
        <>
            <nav className={clsx(styles.navbar)}>
                <div className={clsx(styles.navbarContanier)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.btnIconBar)}>
                            <i className={clsx(styles.iconBar, "fa-solid fa-bars")}></i>
                        </div>

                        <div className={clsx(styles.navbarTitle)}>
                            <h1 className={clsx(styles.title)}>
                                <a href="" className={clsx(styles.titleLink)}>Gear Focus Admin</a>
                                <i className={clsx(styles.iconBell, "fa-solid fa-bell")}></i>
                            </h1>
                        </div>
                    </div>

                    <div className={clsx(styles.navbarIconUser)} onClick={handleClickShow}>
                        <i className="fa-solid fa-user"></i>
                    </div>
                </div>

                {
                    !!showAccountMenu && (
                        <div className={clsx(styles.accountMenu)}>
                            <ul className={clsx(styles.accountList)}>
                                <li className={clsx(styles.accountItem)}>
                                    <p style={{ margin: '0.4rem' }}>My Profile</p>
                                    <p style={{ margin: '0.4rem' }}>admin@powergatesoftware.com</p>
                                </li>

                                <li className={clsx(styles.accountItem)} onClick={onLogout}>
                                    <span style={{ margin: '0.4rem' }} className={clsx(styles.accountLogout)}>Logout</span>
                                </li>
                            </ul>
                        </div>
                    )
                }

            </nav>

        </>
    );
};

export default Navbar;