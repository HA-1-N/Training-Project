import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { useDispatch } from 'react-redux';

import styles from '../css/ProductPage.module.css';
import ProductFilter from './component/ProductFilter';
import ProductDataTable from './component/ProductDataTable';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setInfoProduct } from '../redux/InfoReducer';
import ProductPageAdd from './component/ProductPageAdd/ProductPageAdd';
import { Link } from 'react-router-dom';
import { setFilterCategory } from '../redux/FilterReducer';
import { ROUTES } from '../../../configs/routes';
import { setBrand } from '../redux/BrandReducer';
import Navbar from '../HomePageComponent/Navbar';
import SidebarPage from '../HomePageComponent/SidebarComponent/SidebarPage';

const ProductPage = () => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    }

    const [valueFilterList, setValueFilterList] = useState({
        availability: "all",
        category: "0",
        count: 25,
        order_by: "ASC",
        page: 0,
        search: "",
        search_type: "",
        sort: "name",
        stock_status: "all",
        vendor: "",
    });

    const [valueEdit, setValueEdit] = useState({
        param: [],
    });

    const handleFormFilter = () => {
        const newFilterList = {
            availability: valueFilterList.availability,
            category: valueFilterList.category,
            count: valueFilterList.count,
            order_by: valueFilterList.order_by,
            page: valueFilterList.page + 1,
            search: valueFilterList.search,
            search_type: valueFilterList.search_type,
            sort: valueFilterList.sort,
            stock_status: valueFilterList.stock_status,
            vendor: valueFilterList.vendor,
        }
        postProductFilter(newFilterList);
    }

    const handleChangeItem = () => {
        const newData = {
            param: valueEdit.param,
        }

        editProduct(newData);
    }

    const postProductFilter = useCallback(async (param) => {
        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/api/products/list', 'post', param));
        const totalProduct = json?.data;
        dispatch(setInfoProduct(totalProduct));
    }, [dispatch]);

    const getProductData = useCallback(async () => {
        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/api/products/list', 'post'));
        const totalProduct = json?.data;
        dispatch(setInfoProduct(totalProduct));
    }, [dispatch]);

    const getCategory = useCallback(async () => {
        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/api/categories/list', 'get'));
        const totalCategory = json?.data;
        dispatch(setFilterCategory(totalCategory));
    }, [dispatch]);

    const getBrand = useCallback(async () => {
        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/brands/list', 'get'));
        const totalBrand = json?.data;
        dispatch(setBrand(totalBrand));
    }, [dispatch]);

    const editProduct = useCallback(async (param) => {
        await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/edit', 'post', param));
    }, [dispatch]);

    const handleFilterListChange = (fieldName: any, fieldValue: any) => {
        const newFilterListData: any = { ...valueFilterList };
        newFilterListData[fieldName] = fieldValue;
        setValueFilterList(newFilterListData);
    }

    useEffect(() => {
        getCategory();
    }, [getCategory]);

    useEffect(() => {
        getBrand();
    }, [getBrand]);

    useEffect(() => {
        getProductData();
    }, [getProductData]);

    return (
        <>
            <div className={clsx(styles.productPageContanier)}>
                <Navbar />
                <SidebarPage />
                {!show &&
                    <div className={clsx(styles.products)}>
                        <h1 className={clsx(styles.title)}>Products</h1>
                        <div className={clsx(styles.productFilter)}>
                            <ProductFilter
                                handleFilterListChange={handleFilterListChange}
                                valueFilterList={valueFilterList}
                                handleFormFilter={handleFormFilter}
                            />
                        </div>
                        <div
                            className={clsx(styles.wrapBtn)}
                            onClick={handleClick}
                        >
                            <button className={clsx(styles.btnAdd)}>Add Product</button>
                        </div>
                        <div className={clsx(styles.wrapTable)}>
                            <ProductDataTable
                                valueFilterList={valueFilterList}
                                handleChangeItem={handleChangeItem}
                                onUpdate={editProduct}
                                postProductFilter={postProductFilter}
                            />
                        </div>
                    </div>
                }

                {!!show &&
                    <div className={clsx(styles.productPageAdd)}>
                        <ProductPageAdd
                            show={show}
                            setShow={setShow}
                            // handleClick={handleClick}
                            postProductFilter={postProductFilter}
                        />
                    </div>
                }
            </div>
        </>
    );
};

export default ProductPage;