import React from 'react';
import clsx from 'clsx';
import { BsArrowLeftCircle } from 'react-icons/bs';

import styles from '../../../css/ProductPageAdd.module.css';
import FormAddProduct from './FormAddProduct';

const ProductPageAdd = ({ show, setShow, handleClick, postProductFilter }: any) => {
    return (
        <>
            {!!show &&
                <div className={clsx(styles.productAddPage)}>
                    <div className={clsx(styles.container)}>
                        <div className={clsx(styles.WrapBtn)}>
                            <button className={clsx(styles.btn)} onClick={() => setShow(false)}>
                                <BsArrowLeftCircle />
                            </button>
                        </div>

                        <h1 className={clsx(styles.title)}>Add Product</h1>

                        <div className={clsx(styles.formAddProduct)}>
                            <FormAddProduct
                                getProductFilter={postProductFilter}
                            />
                        </div>

                        <div className={clsx(styles.footerContainer)}>
                            {/* <div className={clsx(styles.width)}></div>
                            <div className={clsx(styles.wrapBtnFooter)}>
                                <button className={clsx(styles.btnCreate)}>Add Product</button>
                            </div>
                            <div className={clsx(styles.width)}></div> */}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ProductPageAdd;