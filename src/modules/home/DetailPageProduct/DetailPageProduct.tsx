import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';

import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Cookies from 'js-cookie';
import { API_PATHS } from '../../../configs/api';
import { profile } from 'console';
import DetailProductComponent from './component/DetailProductComponent';
import styles from '../css/DetailPageProduct.module.css';
import { isEmpty } from 'lodash';

type Params = {
    id?: string,
}

const DetailPageProduct = () => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const categoryData = useSelector((store: any) => store?.filterCategory?.filterCategory);
    const brandData = useSelector((store: any) => store?.productBrand?.productBrand);

    const { id } = useParams<Params>();

    const [infoProduct, setInfoProduct] = useState<any>();

    const [loading, setLoading] = useState<boolean>(false);

    const [totalVendor, setTotalVendor] = useState([]);

    const getVendorProduct = useCallback(async () => {
        const json = await dispatch(fetchThunk(API_PATHS.getVendors, 'get'));
        const totalVendor = json?.data;
        setTotalVendor(totalVendor);
    }, [dispatch]);

    const getVendorDetail = totalVendor?.find((item: any) => item?.id === infoProduct?.id);
    const getBrandDetail = brandData?.find((item: any) => item?.id === infoProduct?.brand_id);

    useEffect(() => {
        const fetchUserById = async () => {
            setLoading(true);
            const res = await fetch('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/detail', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
                },
                cache: 'no-store',
            });

            const json = await res.json();

            if (json?.data) {
                setLoading(false);
                const newData = json?.data;
                setInfoProduct(newData);
            }
        }
        fetchUserById();
    }, [id]);

    useEffect(() => {
        getVendorProduct();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className={clsx(styles.detailProductPage)}>
                {infoProduct && getVendorDetail && getBrandDetail ? (
                    <DetailProductComponent
                        infoProduct={infoProduct}
                        getVendorDetail={getVendorDetail}
                        totalVendor={totalVendor}
                        setInfoProduct={setInfoProduct}
                        getBrandDetail={getBrandDetail}
                    />
                ) : <div>Loading...</div>}
            </div>
        </>
    );
};

export default DetailPageProduct;