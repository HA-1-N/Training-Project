import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import { IProductFormAdd } from '../../../../../models/product';
import AddInfoProduct from './component/AddInfoProduct';
import PriceInventory from './component/PriceInventory';
import styles from '../../../css/FormAddProduct.module.css';
import Marketing from './component/Marketing';
import Shipping from './component/Shipping';
import { validateFormAddProduct } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setInfoProduct } from '../../../redux/InfoReducer';
import { fetchThunk } from '../../../../common/redux/thunk';
import { API_PATHS } from '../../../../../configs/api';
import styled from 'styled-components';

const ButtonCreate = styled.button`
    opacity: 1;
    min-width: 150px;
    min-height: 35px;
    color: #fff;
    background-color: #f0ad4e;
    border: 1px solid #eea236;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    text-transform: none;
    font-weight: 500;
    margin-left: 2rem;
`;

const FormAddProduct = (
    { getProductFilter }: any
) => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const totalProductData: any = useSelector((storeProduct: any) => storeProduct?.infoProduct?.infoProduct);

    const [totalVendors, setTotalVendors] = useState();
    const [loading, setLoading] = useState(false);

    const getVendorProduct = async () => {
        const json = await dispatch(fetchThunk(API_PATHS.getVendors, 'get'));
        const jsonSlice = json?.data?.slice(0, 99);
        setTotalVendors(jsonSlice);
    };

    useEffect(() => {
        getVendorProduct();
    }, []);

    const [formAddValuesProduct, setAddFormValuesProduct] = useState({
        vendor: {
            id: '',
            name: '',
        },
        name: '',
        brand: {
            id: '',
            name: '',
        },
        condition_id: '',
        usedCondition: '',
        sku: '',
        imagesOrder: [],
        categories: [],
        description: '',
        enabled: 0,
        memberships: [],
        tax_exempt: 0,
        price: '',
        participate_sale: 0,
        sale_price_type: '',
        sale_price: '',
        arrival_date: '',
        quantity: '',
        shipping_to_zones_id: '',
        shipping_to_zones_price: '',
        og_tags_type: '',
        og_tags: '',
        meta_desc_type: '',
        meta_description: '',
        meta_keywords: '',
        product_page_title: '',
        facebook_marketing_enabled: 0,
        google_feed_enabled: 0,
    });

    const [validate, setValidate] = useState<IProductFormAdd>();

    const handleClick = () => {
        const validate = validateFormAddProduct(formAddValuesProduct);
        setValidate(validate);
    };

    const handleAddFormChange = (fieldName: any, fieldValue: any) => {
        if (fieldName === "memberships") {
            const newData: any = [];
            newData.push(fieldValue);
            setAddFormValuesProduct(pre => ({
                ...pre,
                memberships: newData,
            }));
        } else if (fieldName === "categories") {
            const newData: any = [];
            newData.push(fieldValue);
            setAddFormValuesProduct(pre => ({
                ...pre,
                categories: newData,
            }));
        } else if (fieldName === "imagesOrder") {
            const newData: any = [];
            newData.push(fieldValue);
            setAddFormValuesProduct(pre => ({
                ...pre,
                imagesOrder: newData,
            }));
        } else {
            const newFormData: any = { ...formAddValuesProduct };
            newFormData[fieldName] = fieldValue;

            setAddFormValuesProduct(newFormData);
        }
    }

    const handleAddFormSubmit = () => {
        const formData = new FormData();
        const newData = {
            vendor_id: formAddValuesProduct?.vendor?.id,
            name: formAddValuesProduct?.name,
            brand_id: formAddValuesProduct?.brand?.id,
            condition_id: formAddValuesProduct?.condition_id,
            categories: formAddValuesProduct?.categories,
            description: formAddValuesProduct?.description,
            enabled: formAddValuesProduct?.enabled,
            memberships: formAddValuesProduct?.memberships,
            shipping_to_zones: [
                {
                    id: 1,
                    price: formAddValuesProduct?.shipping_to_zones_price,
                }
            ],
            tax_exempt: 1,
            price: formAddValuesProduct?.price,
            sale_price_type: formAddValuesProduct?.sale_price_type,
            arrival_date: formAddValuesProduct?.arrival_date,
            inventory_tracking: 0,
            quantity: formAddValuesProduct?.quantity,
            sku: formAddValuesProduct?.sku,
            participate_sale: formAddValuesProduct?.participate_sale,
            sale_price: formAddValuesProduct?.sale_price,
            og_tags_type: formAddValuesProduct?.og_tags_type,
            og_tags: formAddValuesProduct?.og_tags,
            meta_desc_type: formAddValuesProduct?.meta_desc_type,
            meta_description: formAddValuesProduct?.meta_description,
            meta_keywords: formAddValuesProduct?.meta_keywords,
            product_page_title: formAddValuesProduct?.product_page_title,
            facebook_marketing_enabled: formAddValuesProduct?.facebook_marketing_enabled,
            google_feed_enabled: formAddValuesProduct?.google_feed_enabled,
            imagesOrder: formAddValuesProduct.imagesOrder,
            deleted_images: [],
        }
        formData.append('productDetail', JSON.stringify(newData));
        postProductDataCreate(formData);

    }

    const postProductDataCreate = useCallback(async (param) => {
        console.log(param);
        setLoading(true);
        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/create', 'post', param, true, 'multipart/form-data', true));
        if (json) {
            getProductFilter();
        }
        setLoading(false);
    }, [dispatch]);

    const upLoadImage = useCallback(async (param) => {
        setLoading(true);
        await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/api/products/upload-image', 'post', param));
        setLoading(false);
    }, [dispatch]);

    return (
        <>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.wrapInfo)} onClick={handleClick}>
                        <AddInfoProduct
                            validate={validate}
                            formValues={formAddValuesProduct}
                            handleAddFormChange={handleAddFormChange}
                            totalVendors={totalVendors}
                        />
                    </div>

                    <div className={clsx(styles.height)}>
                    </div>

                    <div className={clsx(styles.wrapPriceInventory)}>
                        <PriceInventory
                            formValues={formAddValuesProduct}
                            handleAddFormChange={handleAddFormChange}
                        />
                    </div>

                    <div className={clsx(styles.height)}>
                    </div>

                    <div className={clsx(styles.shipping)}>
                        <Shipping
                            formValues={formAddValuesProduct}
                            handleAddFormChange={handleAddFormChange}
                        />
                    </div>

                    <div className={clsx(styles.height)}>
                    </div>

                    <div className={clsx(styles.wrapMarketing)}>
                        <Marketing
                            formValues={formAddValuesProduct}
                            handleAddFormChange={handleAddFormChange}
                        />
                    </div>
                </div>

                <ButtonCreate onClick={handleAddFormSubmit}>Create Product</ButtonCreate>
            </form>
        </>
    )
}

export default FormAddProduct