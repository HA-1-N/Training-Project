import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from '../../css/DetailPageProduct.module.css';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import DetailInfo from './DetailInfo';
import DetailPriceInventory from './DetailPriceInventory';
import DetailShipping from './DetailShipping';
import DetailMarketing from './DetailMarketing';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../../common/redux/thunk';


const DetailProductComponent = (
    { infoProduct, totalVendor, setInfoProduct, getVendorDetail, getBrandDetail }: any
) => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const [stateInfoProduct, setStateInfoProduct] = useState({
        vendor: {
            id: infoProduct?.vendor_id ?? '',
            name: getVendorDetail?.name ?? '',
        },
        name: infoProduct?.name ?? '',
        brand: {
            id: infoProduct?.brand_id ?? '',
            name: getBrandDetail?.name ?? '',
        },
        condition_id: infoProduct?.condition_id ?? '',
        categories: infoProduct?.categories ?? '',
        sku: infoProduct?.sku ?? '',
        imagesOrder: infoProduct?.images ?? '',
        description: infoProduct?.description ?? '',
        enabled: infoProduct?.enabled ?? '',
        memberships: infoProduct?.memberships ?? '',
        tax_exempt: infoProduct?.tax_exempt ?? '',
        price: infoProduct?.price ?? '',
        sale_price_type: infoProduct?.sale_price_type ?? '',
        participate_sale: infoProduct?.participate_sale ?? '',
        sale_price: infoProduct?.sale_price ?? '',
        arrival_date: infoProduct?.arrival_date ?? '',
        quantity: infoProduct?.quantity ?? '',
        shipping: infoProduct?.shipping ?? '',
        og_tags_type: infoProduct?.og_tags_type ?? '',
        og_tags: infoProduct?.og_tags ?? '',
        meta_desc_type: infoProduct?.meta_desc_type ?? '',
        meta_description: infoProduct?.meta_description ?? '',
        meta_keywords: infoProduct?.meta_keywords ?? '',
        product_page_title: infoProduct?.product_page_title ?? '',
        facebook_marketing_enabled: infoProduct?.facebook_marketing_enabled ?? '',
        google_feed_enabled: infoProduct?.google_feed_enabled ?? '',
    });

    const detailProductChange = (fieldName: any, fieldValue: any) => {
        const newData: any = { ...stateInfoProduct };
        newData[fieldName] = fieldValue;
        setStateInfoProduct(newData);
    }

    const handleClickUpdate = (() => {

        const formData = new FormData();

        const newData = {
            vendor_id: stateInfoProduct?.vendor?.id ?? '',
            name: stateInfoProduct?.name ?? '',
            brand_id: stateInfoProduct?.brand?.id ?? '',
            condition_id: stateInfoProduct?.condition_id,
            categories: stateInfoProduct?.categories ?? '',
            sku: stateInfoProduct?.sku ?? '',
            description: stateInfoProduct?.description ?? '',
            enabled: stateInfoProduct?.enabled ?? '',
            memberships: [4],
            shipping_to_zones: [
                {
                    id: 1,
                    price: "123",
                }
            ],
            tax_exempt: stateInfoProduct?.tax_exempt ?? '',
            price: stateInfoProduct?.price ?? '',
            sale_price_type: stateInfoProduct?.sale_price_type ?? '',
            participate_sale: stateInfoProduct?.participate_sale ?? '',
            sale_price: stateInfoProduct?.sale_price ?? '',
            arrival_date: stateInfoProduct?.arrival_date ?? '',
            quantity: stateInfoProduct?.quantity ?? '',
            og_tags_type: stateInfoProduct?.og_tags_type ?? '',
            og_tags: stateInfoProduct?.og_tags ?? '',
            meta_desc_type: stateInfoProduct?.meta_desc_type ?? '',
            meta_description: stateInfoProduct?.meta_description ?? '',
            meta_keywords: stateInfoProduct?.meta_keywords ?? '',
            product_page_title: stateInfoProduct?.product_page_title ?? '',
            facebook_marketing_enabled: stateInfoProduct?.facebook_marketing_enabled ?? '',
            google_feed_enabled: stateInfoProduct?.google_feed_enabled ?? '',
            imagesOrder: ["MicrosoftTeams-image.png"],
            deleted_images: [],
        }
        console.log(newData);

        formData.append('productDetail', JSON.stringify(newData));
        updatePoductDetail(formData);
    });

    const updatePoductDetail = useCallback(async (param) => {
        await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/create', 'post', param));
    }, [dispatch]);

    return (
        <>
            <div className={clsx(styles.detailPageComponent)}>
                <div className='grid wide'>
                    <div className={clsx(styles.wrapComponent)}>


                        <div className={clsx(styles.buttonPrev)}>
                            <button className={clsx(styles.btnIcon)}>
                                <Link to='/catalog/products' className={clsx(styles.btnIconLink)}>
                                    <BsArrowLeftCircle />
                                </Link>
                            </button>
                        </div>

                        <h3 className={clsx(styles.nameInfoProduct)}>
                            {infoProduct?.name}
                        </h3>

                        <div></div>

                        <div className={clsx(styles.detailInfo)}>
                            <DetailInfo
                                totalVendor={totalVendor}
                                infoProduct={infoProduct}
                                setInfoProduct={setInfoProduct}
                                detailProductChange={detailProductChange}
                                stateInfoProduct={stateInfoProduct}
                                getBrandDetail={getBrandDetail}
                            />
                        </div>

                        <div className={clsx(styles.height)}></div>

                        <div className={clsx(styles.detailPriceInventory)}>
                            <DetailPriceInventory
                                infoProduct={infoProduct}
                                setInfoProduct={setInfoProduct}
                                detailProductChange={detailProductChange}
                            />
                        </div>

                        <div className={clsx(styles.height)}></div>

                        <div className={clsx(styles.detailShipping)}>
                            <DetailShipping
                                infoProduct={infoProduct}
                                setInfoProduct={setInfoProduct}
                                detailProductChange={detailProductChange}
                                stateInfoProduct={stateInfoProduct}
                            />
                        </div>

                        <div className={clsx(styles.height)}></div>

                        <div className={clsx(styles.detailMarketing)}>
                            <DetailMarketing
                                infoProduct={infoProduct}
                                setInfoProduct={setInfoProduct}
                                detailProductChange={detailProductChange}
                            />
                        </div>

                        <div className={clsx(styles.wrapBtnUpdate)}>
                            <button
                                className={clsx(styles.btnUpdate)}
                                onClick={handleClickUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailProductComponent;