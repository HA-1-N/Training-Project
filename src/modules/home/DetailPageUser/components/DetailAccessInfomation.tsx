import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import styled from 'styled-components';
import { ForceChangePasswordEnum } from '../../../../constants/enum';

const ACCESS_LEVEL_DATA = [
    {
        value: '10',
        name: 'Vendor',
    },
    {
        value: '100',
        name: 'Admin',
    },
];

const ACCOUNT_STATUS = [
    {
        value: 'E',
        name: 'Enabled',
    },

    {
        value: 'D',
        name: 'Disabled',
    },

    {
        value: 'U',
        name: 'Unapproved vendor',
    },
];

const MEMBERSHIP = [
    {
        value: null,
        name: 'Ignore Membership',
    },
    {
        value: '4',
        name: 'General',
    },
];

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

const DropDown = styled.div`
    position: relative;
    width: 100%;
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
    height: 40px;
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

const DropDownItem = styled.div`
    width: 100%;
    background: #323259;
    padding: 0.4rem 1rem;
    font-size: 1rem;
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

const TextArea = styled.textarea`
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

const DetailAccessInfomation = ({ profile, changeDetail }: any) => {

    const [accessLevelValues, setAccessLevelValues] = useState(ACCESS_LEVEL_DATA);
    const getAccessLevel = accessLevelValues?.find((item: any) => item?.value === profile?.access_level);

    const getStatus = ACCOUNT_STATUS?.find((item: any) => item?.value === profile?.status);
    const getMembership = MEMBERSHIP?.find((item: any) => item?.value === profile?.membership_id);

    const [status, setStatus] = useState(ACCOUNT_STATUS);
    const [isActiveStatus, setIsActiveStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(getStatus?.name);

    const [membership, setMembership] = useState(MEMBERSHIP);
    const [isActiveMembership, setIsActiveMembership] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState(getMembership?.name);

    const handleActiveStatus = () => {
        setIsActiveStatus(!isActiveStatus);
    };

    const handleActiveMembership = () => {
        setIsActiveMembership(!isActiveMembership);
    }

    const onChangeForm = (fieldName: string, fieldValue?: string) => (e?: any) => {
        changeDetail(fieldName, fieldValue || e?.target?.value || '');
    }

    useEffect(() => {
        setSelectedStatus(getStatus?.name);
    }, []);

    useEffect(() => {
        setSelectedMembership(getMembership?.name);
    }, []);

    return (
        <>
            <div>
                <h3
                    style={{
                        color: '#fff',
                    }}
                >
                    Access information
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
                                        Access Level
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    {/* <Input
                                        type='hidden'
                                        name='access_level'
                                        defaultValue={'access_level'}
                                        onChange={onChangeForm('access_level')}
                                    /> */}
                                    <span style={{ color: '#fff' }}>{getAccessLevel?.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'>

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
                                        Account status <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                        }}
                                    >
                                        <DropDown>
                                            <DropDownBtn
                                                onClick={handleActiveStatus}
                                            >
                                                {selectedStatus}
                                                <span
                                                    style={{ float: 'right' }}
                                                >
                                                    {!isActiveStatus ? <FaAngleDown /> : <FaAngleUp />}
                                                </span>
                                            </DropDownBtn>

                                            {isActiveStatus && (
                                                <DropDownContent style={{ height: 'auto' }}>
                                                    {status.map((status: any, index: number) => (
                                                        <DropDownItem
                                                            key={index}
                                                            onClick={() => {
                                                                setSelectedStatus(status.name);
                                                                setIsActiveStatus(false);
                                                                onChangeForm('status', status.value)();
                                                            }}
                                                        >
                                                            {status.name}
                                                        </DropDownItem>
                                                    ))}
                                                </DropDownContent>
                                            )}
                                        </DropDown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'>

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
                                        Status comment (reason)
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                        }}
                                    >
                                        <TextArea
                                            name='statusComment'
                                            defaultValue={profile?.statusComment}
                                            onChange={onChangeForm('statusComment')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'>

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
                                        Membership <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                        }}
                                    >
                                        <DropDown>
                                            <DropDownBtn
                                                onClick={handleActiveMembership}
                                            >
                                                {selectedMembership}
                                                <span
                                                    style={{
                                                        float: 'right',
                                                    }}
                                                >
                                                    {!isActiveMembership ? <FaAngleDown /> : <FaAngleUp />}
                                                </span>
                                            </DropDownBtn>

                                            {isActiveMembership && (
                                                <DropDownContent style={{ height: 'auto' }}>
                                                    {membership.map((membership: any, index: number) => (
                                                        <DropDownItem
                                                            key={index}
                                                            onClick={() => {
                                                                setSelectedMembership(membership.name);
                                                                setIsActiveMembership(false);
                                                                onChangeForm('membership_id', membership.value)();
                                                            }}
                                                        >
                                                            {membership.name}
                                                        </DropDownItem>
                                                    ))}
                                                </DropDownContent>
                                            )}
                                        </DropDown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'>

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
                                        Pending Membership
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                        }}
                                    >
                                        <span style={{ color: '#fff' }}>none</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'>

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
                                        Require to change password on next log in
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
                                            name='forceChangePassword'
                                            defaultChecked={profile?.forceChangePassword}
                                            onChange={(e) => onChangeForm('forceChangePassword')(e.target.checked ? ForceChangePasswordEnum.Inactive : ForceChangePasswordEnum.Active)}
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

export default DetailAccessInfomation;