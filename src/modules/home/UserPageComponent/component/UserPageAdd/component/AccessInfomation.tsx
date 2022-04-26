import React, { useCallback, useEffect, useState } from 'react';
import { Autocomplete, Checkbox, Grid, InputLabel, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { fetchThunk } from '../../../../../common/redux/thunk';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { ForceChangePasswordEnum } from '../../../../../../constants/enum';

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

const Select = styled.select`
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
    outline: none
`;

const Option = styled.option`
    width: 100%;
    border: 1px solid #13132b;
    background: #323259;
    padding: 0.4rem 1rem;
    fontSize: 1rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
`

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

const fieldMembership = [
    {
        value: null,
        name: 'Ignore Membership',
    },
    {
        value: '4',
        name: 'General',
    },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AccessInfomation = ({ formValues, handleAddFormChange }: any) => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();


    const getRoleData = useCallback(async () => {
        setLoading(true);

        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/commons/role', 'get'));
        const totalRoleData = json?.data;
        const roleAdmin = totalRoleData?.administrator;
        setRoleDataAdmin(roleAdmin);
        setLoading(false);
    }, []);

    useEffect(() => {
        getRoleData();
    }, [getRoleData]);

    const [loading, setLoading] = useState(false);
    const [roleDataAdmin, setRoleDataAdmin] = useState([]);
    console.log(roleDataAdmin);

    const [accessLevelValues, setAccessLevelValues] = useState(ACCESS_LEVEL_DATA);
    const [isActiveAccessLevel, setIsActiveAccessLevel] = useState(false);
    const [selectedAccessLevel, setSelectedAccessLevel] = useState('Vendor');
    const handleActiveAccessLevel = () => {
        setIsActiveAccessLevel(!isActiveAccessLevel);
    }

    const [isActiveMembership, setIsActiveMembership] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState('Ignore Membership');
    const handleActiveMembership = () => {
        setIsActiveMembership(!isActiveMembership);
    }
    const [isActiveRole, setIsActiveRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string[]>([]);

    const onChangeForm = (fieldName: string, fieldValue?: string | number) => {
        console.log({ fieldName, fieldValue })
        handleAddFormChange(fieldName, fieldValue ?? '');
    }

    const handleActiveRole = () => {
        setIsActiveRole(!isActiveRole);
    }

    const handleClickRoleItem = (roleItem: any, index: number) => {
        if (selectedRole?.includes(roleItem.name)) {
            setSelectedRole(selectedRole?.filter((role) => role !== roleItem.name));
        } else {
            const newSelectedRole: any = [...selectedRole, roleItem.name];
            setSelectedRole(newSelectedRole);
        }
    }

    return (
        <>
            <h6
                style={{
                    fontSize: '1.2rem',
                    color: '#fff',
                    margin: '1.6rem 0.8rem',
                }}
            >Access Infomation</h6>
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
                                    Access level <Typography sx={{ fontSize: '1.2rem', marginLeft: '4px', }}> * </Typography>
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                    }}
                                >
                                    <DropDownBtn onClick={handleActiveAccessLevel}>
                                        <Input
                                            type='hidden'
                                            name='access_level'
                                            value={formValues.access_level}
                                            onChange={(e) => onChangeForm('access_level')}
                                            style={{
                                                width: '100%',
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                background: 'none transparent',
                                                border: '0',
                                                outline: 'none',
                                                cursor: 'default',
                                                color: '#fff',
                                                fontWeight: '600',
                                            }}
                                        />
                                        {selectedAccessLevel}
                                        <span style={{
                                            float: 'right',
                                        }}>
                                            {!isActiveAccessLevel ? <FaAngleDown /> : <FaAngleUp />}
                                        </span>
                                    </DropDownBtn>

                                    {isActiveAccessLevel && (
                                        <div
                                            style={{
                                                width: '100%',
                                                background: '#323259',
                                                position: 'absolute',
                                                top: '50px',
                                                zIndex: '10',
                                            }}
                                        >
                                            {accessLevelValues?.map((item: any, index: number) => (
                                                <DropDownItem
                                                    key={index}
                                                    onClick={(e) => {
                                                        setSelectedAccessLevel(item.name);
                                                        setIsActiveAccessLevel(false);
                                                        onChangeForm('access_level', item.value);
                                                    }}
                                                >
                                                    {item.name}
                                                </DropDownItem>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col l-6'></div>
                </div>
            </Grid>

            {selectedAccessLevel === 'Admin' ? (
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
                                        Role
                                    </InputLabel>

                                </div>
                                <div className='col l-6'>
                                    <DropDown style={{ height: 'auto' }}>
                                        <DropDownBtn
                                            style={{ height: 'auto' }}
                                            onClick={handleActiveRole}
                                        >
                                            {selectedRole.toString()}
                                            <span style={{ float: 'right', }}>{!isActiveRole ? <FaAngleDown /> : <FaAngleUp />}</span>
                                        </DropDownBtn>

                                        {isActiveRole && (
                                            <DropDownContent style={{ height: 'auto' }}>
                                                {roleDataAdmin?.map((roleItem: any, index: number) => (
                                                    <DropDownItem key={index}>
                                                        <Input
                                                            type='checkbox'
                                                            checked={selectedRole?.includes(roleItem.name)}
                                                            style={{
                                                                width: '15px',
                                                                height: '15px',
                                                                marginRight: '1rem',
                                                            }}
                                                            onClick={() => handleClickRoleItem(roleItem, index)}
                                                        />
                                                        {roleItem.name}
                                                    </DropDownItem>
                                                ))}
                                            </DropDownContent>
                                        )}
                                    </DropDown>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </Grid>
            ) : null}

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
                                    Membership
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                    }}
                                >
                                    <DropDownBtn
                                        onClick={handleActiveMembership}
                                    >
                                        <Input
                                            type='hidden'
                                            name='membership_id'
                                            value={formValues.membership_id}
                                            onChange={(e) => onChangeForm('membership_id')}
                                            style={{
                                                width: '100%',
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                background: 'none transparent',
                                                border: '0',
                                                outline: 'none',
                                                cursor: 'default',
                                                color: '#fff',
                                                fontWeight: '600',
                                            }}
                                        />
                                        {selectedMembership}
                                        <span style={{
                                            float: 'right',
                                        }}>
                                            {!isActiveMembership ? <FaAngleDown /> : <FaAngleUp />}
                                        </span>
                                    </DropDownBtn>
                                    <div
                                        style={{
                                            width: '100%',
                                            background: '#323259',
                                            position: 'absolute',
                                            top: '50px',
                                            zIndex: '10',
                                        }}
                                    >
                                        {isActiveMembership && fieldMembership.map((membership: any, index: number) => (
                                            <DropDownItem
                                                key={index}
                                                onClick={(e) => {
                                                    setSelectedMembership(membership.name);
                                                    setIsActiveMembership(false);
                                                    onChangeForm('membership_id', membership.value)
                                                }}
                                            >
                                                {membership.name}
                                            </DropDownItem>
                                        ))}
                                    </div>
                                </div>
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
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                    Require to change password on next log in
                                </InputLabel>

                            </div>
                            <div className='col l-6'>
                                <Input
                                    type='checkbox'
                                    name='forceChangePassword'
                                    onChange={(e) => {
                                        onChangeForm('forceChangePassword', e.target.checked ? ForceChangePasswordEnum.Inactive : ForceChangePasswordEnum.Active)
                                    }}
                                    style={{ height: '15px', width: '15px', color: '#3498db' }}
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

export default AccessInfomation;