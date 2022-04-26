import React from 'react';
import styled from 'styled-components';

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

const DetailEmailPassword = ({ profile, changeDetail }: any) => {

    const onChangeForm = (fieldName: string, fieldValue?: string) => (e?: any) => {
        changeDetail(fieldName, fieldValue || e?.target?.value || '');
    }

    return (
        <>
            <div>

                <h3
                    style={{
                        color: '#fff',
                    }}
                >
                    Email & password
                </h3>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        First Name <span style={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Input
                                        type='text'
                                        name='firstName'
                                        defaultValue={profile.firstName}
                                        onChange={onChangeForm('firstName')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Last Name <span style={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Input
                                        type='text'
                                        name='lastName'
                                        defaultValue={profile.lastName}
                                        onChange={onChangeForm('lastName')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Email <span style={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Input
                                        type='email'
                                        name='email'
                                        defaultValue={profile?.email}
                                        onChange={onChangeForm('email')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Password <span style={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Input
                                        type='password'
                                        name='password'
                                        value={profile.password}
                                        onChange={onChangeForm('password')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Confirm Password <span style={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Input
                                        type='password'
                                        name='confirm_password'
                                        value={profile.confirm_password}
                                        onChange={onChangeForm('confirm_password')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Type
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <span
                                        style={{ color: '#fff' }}
                                    >
                                        {profile?.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        PaymentRails ID
                                    </label>
                                </div>
                                <div className='col l-6'>

                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailEmailPassword;