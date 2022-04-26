import { OptionUnstyled, optionUnstyledClasses, PopperUnstyled, SelectUnstyled, selectUnstyledClasses, SelectUnstyledProps } from '@mui/base';
import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import styled from 'styled-components';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { setInfoProduct } from '../../redux/InfoReducer';

const Form = styled.form`

`;

const InputSearch = styled.input`
    width: 100%;
    border-radius: 0.25rem;
    padding: 0.425rem 1rem;
    color: #fff;
    background-color: #252547;
    font-size: 1rem;
    font-weight: 600;
    border: 1px solid #13132b;
    outline: none;

    &:hover{
        background-color: #1b1b38;
        border: 1px solid #13132b;
    }
    
    &:focus{
        background-color: #323259;
        border: 1px solid #a16eff;
    }
`;

const ProductFilterContainer = styled.div`
    background: #323259;
    padding: 2rem;
`;

const ButtonSearch = styled.button`
    color: #fff;
    background-color: #b18aff;
    width: 100%;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 0.6rem;

    &:hover{
        color: #1b1b38;
        cursor: pointer;
    }
`;

const DropDown = styled.div`
    position: relative;
    width: 100%;
    height: auto;
`;

const DropDownBtn = styled.button`
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background-color: #252547;
    border: 1px solid #13132b;
    border-radius: 0.25rem;
    padding: 0.4rem 1rem;
    cursor: pointer;
    height: auto;
    text-align: left;  

    &:hover{
        background-color: #1b1b38;
        border: 1px solid #13132b;
    }

    &:focus{
        background-color: #323259;
        border: 1px solid #a16eff;
    }
`;

const DropDownContent = styled.div`
    width: 100%;
    height: 300px;
    background: #323259;
    position: absolute;
    top: 50px;
    z-index: 10;
    border: 1px solid #13132b;
    overflow: auto;
`;

const DropDownItem = styled.button`
    width: 100%;
    background: #323259;
    padding: 0.4rem 1rem;
    fontSize: 1rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    text-align: left;
    border: none;
    // border-bottom: 1px solid #13132b;

    &:hover{
        background-color: rgba(180,180,219,.16);
        color: #fff;
    }
`;

const ProductFilter = (
    { handleFilterListChange, valueFilterList, handleFormFilter }: any
) => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const productData = useSelector((store: any) => store?.infoProduct?.infoProduct);
    const totalCategory = useSelector((store: any) => store?.filterCategory?.filterCategory);

    const [productDataList, setProductDataList] = useState<any>();

    const [category, setCategory] = React.useState<any>('Any Category');
    const [isActiveCategory, setIsActiveCategory] = useState(false);
    const [stock, setStock] = React.useState('');

    const [searchTerms, setSearchTerm] = useState('');

    const getProducts = useCallback(async () => {
        try {
            const response = await axios.get(API_PATHS.getProducts);
            const products = response?.data?.data;
            setProductDataList(products);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const onChangeForm = (fieldName?: string, fieldValue?: string) => (e?: any) => {
        handleFilterListChange(fieldName, fieldValue || e?.target?.value || '');
    }

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleActiveCategory = () => {
        setIsActiveCategory(!isActiveCategory);
    }

    const handleChangeStock = (event: SelectChangeEvent) => {
        setStock(event.target.value as string);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const handleSearchFilter = () => {
        handleFormFilter();
    }

    // const getSearchTerms = (e: any) => {
    //     setSearchTerm(e.target.value);
    // };

    // const handleSubmitSearch = () => {
    //     if (searchTerms) {
    //         const newProductDatas: any = productDataList?.filter((product: any) => {
    //             const matchName = !searchTerms ? true : product?.name?.toLowerCase().indexOf(searchTerms.toLowerCase()) !== -1;
    //             const matchCategoty = category.includes(product?.category);
    //             return matchName && matchCategoty;
    //         });
    //         dispatch(setInfoProduct(newProductDatas));
    //     } else {
    //         dispatch(setInfoProduct(productDataList));
    //     }
    // };

    useEffect(() => {
        dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/api/products/list', 'post'));
        dispatch(setInfoProduct(productData));
    }, [valueFilterList]);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <ProductFilterContainer>
                    <div className='wide'>
                        <div className='row'>
                            <div className='col l-6'>
                                <div>
                                    <InputSearch
                                        type='text'
                                        name='search'
                                        placeholder='Search keywords'
                                        value={valueFilterList.search}
                                        onChange={onChangeForm('search')}
                                    />
                                </div>
                            </div>

                            <div className='col l-6'>
                                <div className='row'>
                                    <div className='col l-5'>
                                        <Box sx={{ minWidth: 120 }}>
                                            <DropDown>
                                                <DropDownBtn
                                                    onClick={handleActiveCategory}
                                                >
                                                    {category}
                                                    <span style={{ float: 'right', }}>{!isActiveCategory ? <FaAngleDown /> : <FaAngleUp />}</span>
                                                </DropDownBtn>

                                                {isActiveCategory && (
                                                    <DropDownContent>
                                                        <DropDownItem
                                                            onClick={() => {
                                                                setCategory('Any Category');
                                                                setIsActiveCategory(false);
                                                                onChangeForm('category', '0')();
                                                            }}
                                                        >
                                                            Any Category
                                                        </DropDownItem>
                                                        {totalCategory?.map((category: any, index: number) => (
                                                            <DropDownItem
                                                                key={index}
                                                                onClick={() => {
                                                                    setCategory(category.name);
                                                                    setIsActiveCategory(false);
                                                                    onChangeForm('category', category.id)();
                                                                }}
                                                            >
                                                                -----{category.name}
                                                            </DropDownItem>
                                                        ))}
                                                    </DropDownContent>
                                                )}
                                            </DropDown>
                                        </Box>
                                    </div>
                                    <div className='col l-5'>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth size='small'>
                                                <InputLabel id="demo-simple-select-label">Any stock status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={valueFilterList.stock_status}
                                                    label="status"
                                                    name='stock_status'
                                                    onChange={onChangeForm('stock_status')}
                                                >
                                                    <MenuItem value={'all'}>Any stock status</MenuItem>
                                                    <MenuItem value={'in'}>In stock</MenuItem>
                                                    <MenuItem value={'low'}>Low Stock</MenuItem>
                                                    <MenuItem value={'out'}>SOLD</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                    <div className='col l-2'>
                                        <ButtonSearch onClick={handleSearchFilter}>Search</ButtonSearch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </ProductFilterContainer>
            </Form>
        </>
    );
};

export default ProductFilter;