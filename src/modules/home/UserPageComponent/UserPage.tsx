import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import styles from '../css/UserPage.module.css';
import UserFilter from './component/UserFilter';
import UserDataTable from './component/UserDataTable';
import { AppState } from '../../../redux/reducer';
import { API_PATHS } from '../../../configs/api';
import UserPageAdd from './component/UserPageAdd/UserPageAdd';
import { USER_LIST_DATA } from '../data/user_list_data';
import { setInfoUser } from '../redux/InfoReducer';
import { fetchThunk } from '../../common/redux/thunk';
import { Link } from 'react-router-dom';
import { types } from 'util';
import Sidebar from '../HomePageComponent/Sidebar';
import SidebarPage from '../HomePageComponent/SidebarComponent/SidebarPage';
import Navbar from '../HomePageComponent/Navbar';

const UserPage = () => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false);

    const [valueFilterList, setValueFilterList] = useState({
        page: 0,
        count: 25,
        search: '',
        membership: [],
        types: [],
        status: [],
        country: '',
        state: '',
        address: '',
        phone: '',
        date_type: 'R',
        date_range: [],
        sort: 'last_login',
        order_by: 'DESC',
        tz: 7,
    });

    const handleFormFilter = () => {
        const newFilterList = {
            page: valueFilterList.page + 1,
            count: valueFilterList.count,
            search: valueFilterList.search,
            membership: valueFilterList.membership,
            types: valueFilterList.types,
            status: valueFilterList.status,
            country: valueFilterList.country,
            state: valueFilterList.state,
            address: valueFilterList.address,
            phone: valueFilterList.phone,
            data_type: valueFilterList.date_type,
            data_range: valueFilterList.date_range,
            sort: valueFilterList.sort,
            order_by: valueFilterList.order_by,
            tz: valueFilterList.tz,
        }
        getUserData(newFilterList);
    }

    const getUserData = useCallback(async (param) => {
        setLoading(true);

        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list', 'post', param));
        const totalUser = json?.data;
        dispatch(setInfoUser(totalUser));
        setLoading(false);
    }, [dispatch]);

    const getUserDataTable = useCallback(async () => {
        setLoading(true);
        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list', 'post'));
        const totalUser = json?.data;
        dispatch(setInfoUser(totalUser));
        setLoading(false);
    }, [dispatch]);

    const handleFilterListChange = (fieldName: any, fieldValue: any, e: any) => {
        if (fieldName === "types") {
            if (e.target.checked) {
                const newData: any = [...valueFilterList.types, fieldValue];
                // const newData: any = [...valueFilterList.types, { id: fieldValue, delete: 1 }];
                console.log("newData..", newData);
                setValueFilterList((prev) => ({
                    ...prev,
                    types: newData,
                }));
            } else {
                console.log(fieldValue);
                const newItem = valueFilterList.types.filter((item) => item !== fieldValue);
                console.log('newItem...', newItem);
            }
        } else if (fieldName === "status") {
            const newDataStatus: any = [];
            if (fieldValue) {
                newDataStatus.push(fieldValue);
            }

            setValueFilterList((prev) => ({
                ...prev,
                status: newDataStatus,
            }));
        } else {
            const newFilterListData: any = { ...valueFilterList };
            newFilterListData[fieldName] = fieldValue;
            setValueFilterList(newFilterListData);
        }
    };

    const postDeleteUser = useCallback(async (param) => {
        setLoading(true);
        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/edit', 'post', param));
        console.log(json);
        setLoading(false);
    }, [dispatch]);

    // useEffect(() => {
    //     getUserData();
    // }, [data]);

    // useEffect(() => {
    //     dispatch(setInfoUser(totalUser));
    // }, [dispatch]);

    const [showUserAddPage, setShowUserAddPage] = useState(false);

    const handleClick = () => {
        setShowUserAddPage(!showUserAddPage);
    }

    useEffect(() => {
        getUserDataTable();
    }, [getUserDataTable]);

    return (
        <>
            <div className={clsx(styles.userPageContanier)}>
                <Navbar />
                <SidebarPage />
                {!showUserAddPage &&
                    (
                        <div className={clsx(styles.users)}>
                            <h1 className={clsx(styles.title)}>Search For User</h1>
                            <div className={clsx(styles.userFilter)}>
                                <UserFilter
                                    handleFormFilter={handleFormFilter}
                                    handleFilterListChange={handleFilterListChange}
                                    valueFilterList={valueFilterList}
                                />
                            </div>
                            <div className={clsx(styles.wrapBtn)} onClick={handleClick}>
                                <button className={clsx(styles.btnAddUser)}>Add User</button>
                            </div>
                            <div className={clsx(styles.wrapTable)}>
                                <UserDataTable
                                    getUserData={getUserData}
                                    handleFilterListChange={handleFilterListChange}
                                    valueFilterList={valueFilterList}
                                />
                            </div>
                        </div>
                    )
                }

                {!!showUserAddPage && (
                    <div className={clsx(styles.wrapUserPageAdd)}>
                        <UserPageAdd showUserAddPage={showUserAddPage} setShowUserAddPage={setShowUserAddPage} handleClick={handleClick} getUserData={getUserData} />
                    </div>
                )}
            </div>
        </>
    );
};

export default UserPage;