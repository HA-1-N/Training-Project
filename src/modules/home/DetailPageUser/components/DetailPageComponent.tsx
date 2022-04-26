import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from '../../css/DetailPageComponent.module.css';
import { BsArrowLeftCircle } from 'react-icons/bs';
import DetailEmailPassword from './DetailEmailPassword';
import DetailAccessInfomation from './DetailAccessInfomation';
import DetailTaxInfomation from './DetailTaxInfomation';
import { Link } from 'react-router-dom';
import { fetchThunk } from '../../../common/redux/thunk';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setInfoUser } from '../../redux/InfoReducer';

type DetailPageComponentProps = {
    profile: any,
    setProfile: any,
}

const DetailPageComponent: React.FC<DetailPageComponentProps> = (props: DetailPageComponentProps) => {

    const { profile, setProfile } = props;
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const [stateProfile, setStateProfile] = useState({
        id: profile?.vendor_id ?? '',
        firstName: profile?.firstName ?? '',
        lastName: profile?.lastName ?? '',
        email: profile?.email ?? '',
        password: profile?.password ?? '',
        confirm_password: profile?.confirm_password ?? '',
        membership_id: profile?.membership_id ?? '',
        roles: profile?.roles ?? '',
        status: profile?.status ?? '',
        statusComment: profile?.statusComment ?? '',
        forceChangePassword: profile?.forceChangePassword ?? '',
        taxExempt: profile?.taxExempt ?? '',
    });

    const postDetailUser = useCallback(async (param) => {
        await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/edit', 'post', param));
    }, [dispatch]);

    const changeDetail = (fieldName: any, fieldValue: any) => {
        const newItem: any = { ...stateProfile };
        newItem[fieldName] = fieldValue;
        setStateProfile(newItem);
    }

    const handleClickUpdate = () => {
        postDetailUser({
            params: [{
                ...stateProfile,
            }],
        });
    };

    return (
        <>
            <div className='grid wide'>
                <div className={clsx(styles.wrapComponent)}>
                    <div className={clsx(styles.buttonPrev)}>
                        <button className={clsx(styles.btnIcon)}>
                            <Link to='/user/userlist' className={clsx(styles.btnIconLink)}>
                                <BsArrowLeftCircle />
                            </Link>
                        </button>
                    </div>

                    <div className={clsx(styles.vendorTitle)}>
                        <h2 className={clsx(styles.vendorTag)}>
                            {profile?.email}
                            <span> ({profile?.companyName})</span>
                        </h2>
                    </div>

                    <div className={clsx(styles.side)}>

                    </div>

                    <div className={clsx(styles.emailPassword)}>
                        <DetailEmailPassword
                            profile={profile}
                            changeDetail={changeDetail}
                        />
                    </div>

                    <div className={clsx(styles.height)}></div>

                    <div className={clsx(styles.accessInfomation)}>
                        <DetailAccessInfomation
                            profile={profile}
                            changeDetail={changeDetail}
                        />
                    </div>

                    <div className={clsx(styles.height)}></div>

                    <div className={clsx(styles.taxInfomation)}>
                        <DetailTaxInfomation
                            profile={profile}
                            changeDetail={changeDetail}
                        />
                    </div>

                    <div className={clsx(styles.wrapBtnUpdate)}>
                        <button className={clsx(styles.btnUpdate)} onClick={handleClickUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailPageComponent;