import React from 'react';
import styled from 'styled-components';
import { TaxtExempt } from '../../../../constants/enum';

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

const DetailTaxInfomation = ({ profile, changeDetail }: any) => {

    const onChangeForm = (fieldName: string, fieldValue: string | number) => {
        changeDetail(fieldName, fieldValue ?? '');
    }

    return (
        <>
            <div>
                <h3
                    style={{ color: '#fff' }}
                >
                    Tax information
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
                                        Tax exempt
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                        }}
                                    >
                                        <Input
                                            type='checkbox'
                                            name='taxExempt'
                                            defaultChecked={profile?.taxExempt}
                                            onChange={(e) => onChangeForm('taxExempt', e.target.checked ? TaxtExempt.Inactive : TaxtExempt.Active)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'>

                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailTaxInfomation;