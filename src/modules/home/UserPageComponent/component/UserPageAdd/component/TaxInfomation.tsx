import React from 'react';
import { Grid, InputLabel, Typography } from '@mui/material';
import styled from 'styled-components';
import { TaxtExempt } from '../../../../../../constants/enum';

const Input = styled.input`
    width: 100%;
    color: #fff;
    background-color: #252547;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.25rem;
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

const TaxInfomation = ({ formValues, handleAddFormChange }: any) => {

    const onChangeForm = (fieldName: string, fieldValue: string | number) => {
        handleAddFormChange(fieldName, fieldValue ?? '');
    };

    return (
        <>
            <h6
                style={{
                    fontSize: '1.2rem',
                    color: '#fff',
                    margin: '1.2rem 0.8rem 1.6rem',
                }}
            >Tax Infomation</h6>
            <Grid sx={{ marginBottom: '2.4rem' }}>
                <div className='row'>
                    <div className='col l-6'>
                        <div className='row'>
                            <div className='col l-6'>
                                <InputLabel
                                    sx={{
                                        float: 'right',
                                        fontSize: '1rem',
                                        fontWeight: '400',
                                        color: '#fff',
                                        letterSpacing: '1px',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                    Tax exempt
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <Input
                                    type='checkbox'
                                    name='taxExempt'
                                    onChange={(e) => onChangeForm('taxExempt', e.target.checked ? TaxtExempt.Inactive : TaxtExempt.Active)}
                                    style={{ height: '15px', width: '15px', }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'></div>
                </div>
            </Grid>
        </>
    );
};

export default TaxInfomation;