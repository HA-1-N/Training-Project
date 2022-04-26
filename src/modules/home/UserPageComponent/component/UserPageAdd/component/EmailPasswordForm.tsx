import { Grid, InputLabel, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { InfoUser } from '../../../../../../models/infouser';

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


const EmailPasswordForm = ({ validate, formValues, handleAddFormChange }: any) => {

    const onChangeForm = (fieldName: string, fieldValue?: string) => (e?: any) => {
        handleAddFormChange(fieldName, fieldValue || e?.target?.value || '');
    }

    return (
        <>
            <h6
                style={{
                    fontSize: '1.2rem',
                    color: '#fff',
                    margin: '1.2rem 0.8rem 1.6rem',
                }}
            >Email & Password</h6>
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
                                        display: 'flex',
                                    }}>
                                    First Name <Typography sx={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </Typography>
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <Input
                                    type='text'
                                    name='firstName'
                                    value={formValues.firstName}
                                    onChange={onChangeForm('firstName')}
                                />
                                {!!validate?.firstName && (
                                    <small className='text-danger' style={{ textAlign: 'center' }}>{validate.firstName}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'></div>
                </div>
            </Grid>

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
                                        display: 'flex',
                                    }}>
                                    Last Name <Typography sx={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </Typography>
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <Input
                                    type='text'
                                    name='lastName'
                                    value={formValues.lastName}
                                    onChange={onChangeForm('lastName')}
                                />
                                {!!validate?.lastName && (
                                    <small className='text-danger' style={{ textAlign: 'center' }}>{validate.lastName}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'></div>
                </div>
            </Grid>

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
                                        display: 'flex',
                                    }}>
                                    Email <Typography sx={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </Typography>
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <Input
                                    type='email'
                                    name='email'
                                    value={formValues.email}
                                    onChange={onChangeForm('email')}
                                />
                                {!!validate?.email && (
                                    <small className='text-danger' style={{ textAlign: 'center' }}>{validate.email}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'></div>
                </div>
            </Grid>

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
                                        display: 'flex',
                                    }}>
                                    Password <Typography sx={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </Typography>
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <Input
                                    type='password'
                                    name='password'
                                    value={formValues.password}
                                    onChange={onChangeForm('password')}
                                />
                                {!!validate?.password && (
                                    <small className='text-danger' style={{ textAlign: 'center' }}>{validate.password}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'></div>
                </div>
            </Grid>

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
                                        display: 'flex',
                                    }}>
                                    Confirm Password <Typography sx={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </Typography>
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <Input
                                    type='password'
                                    name='confirm_password'
                                    value={formValues.confirm_password}
                                    onChange={onChangeForm('confirm_password')}
                                />
                                {!!validate?.confirm_password && (
                                    <small className='text-danger' style={{ textAlign: 'center' }}>{validate.confirm_password}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'></div>
                </div>
            </Grid>

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
                                        display: 'flex',
                                    }}>
                                    Type
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <select className="form-select" aria-label="Default select example"
                                    style={{
                                        backgroundColor: '#252547',
                                        color: '#fff',
                                        border: '1px solid #13132b',
                                        borderRadius: '0.25rem',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                    }}
                                    name='paymentRailsType'
                                    onChange={onChangeForm('paymentRailsType')}
                                >
                                    <option selected value='individual'>Individual</option>
                                    <option value="business">Business</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'></div>
                </div>
            </Grid>

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
                                        display: 'flex',
                                    }}>
                                    PaymentRails ID
                                </InputLabel>

                            </div>
                            <div className='col l-6'>

                            </div>
                        </div>
                    </div>
                    <div className='col l-6'></div>
                </div>
            </Grid>
        </>
    );
};

export default EmailPasswordForm;