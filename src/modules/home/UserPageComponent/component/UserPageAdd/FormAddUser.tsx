import { Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';
import { Action } from 'typesafe-actions';
import { ForceChangePasswordEnum, TaxtExempt } from '../../../../../constants/enum';

import { InfoUser } from '../../../../../models/infouser';
import { AppState } from '../../../../../redux/reducer';
import { fetchThunk } from '../../../../common/redux/thunk';
import { setInfoUser } from '../../../redux/InfoReducer';
import { validateFormAddUser } from '../../../utils';
import AccessInfomation from './component/AccessInfomation';
import EmailPasswordForm from './component/EmailPasswordForm';
import TaxInfomation from './component/TaxInfomation';

const Container = styled.div`
    
`;

const Height = styled.div`
    height: 20px;
    background: #323259;
`

const ContainerEmailPassword = styled.div`
    padding: 3rem;
    padding-top: 0;
`;

const ContainerAccessInfomation = styled.div`
    padding: 3rem;
    padding-top: 0;
    padding-bottom: 0.2rem;
`;

const ContainerTax = styled.div`
    padding: 0 3rem 0.2rem;
`;

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

const FormAddUser = ({ getUserDataTable, setShowUserAddPageClick }: any) => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const totalUserData: any = useSelector((storeUser: any) => storeUser?.infoUser?.infoUser);

    const [showAlert, setShowAlert] = useState(false);

    const [loading, setLoading] = useState(false);
    const [addFormValues, setAddFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm_password: '',
        access_level: '',
        paymentRailsType: '',
        membership_id: '',
        forceChangePassword: ForceChangePasswordEnum.Active,
        taxExempt: TaxtExempt.Active,
    });

    const handleAddFormChange = (fieldName: any, fieldValue: any) => {
        const newFormData: any = { ...addFormValues };
        newFormData[fieldName] = fieldValue;
        setAddFormValues(newFormData);
    }

    const handleAddFormSubmit = (e: any) => {
        e.preventDefault();

        const newUser = {
            firstName: addFormValues.firstName,
            lastName: addFormValues.lastName,
            email: addFormValues.email,
            password: addFormValues.password,
            confirm_password: addFormValues.confirm_password,
            access_level: addFormValues.access_level,
            paymentRailsType: addFormValues.paymentRailsType,
            membership_id: addFormValues.membership_id,
            forceChangePassword: addFormValues.forceChangePassword,
            taxExempt: addFormValues.taxExempt,
        }
        // const newUsers: any = [...totalUserData, newUser];
        // dispatch(setInfoUser(newUsers));
        postUserData(newUser);
        setShowAlert(true);
    }

    const [validate, setValidate] = useState<InfoUser>();

    const handleClick = () => {
        const validate = validateFormAddUser(addFormValues);
        setValidate(validate);
    }

    const postUserData = useCallback(async (param) => {
        setLoading(true);
        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/create', 'post', param));
        console.log(json);
        if (json) {
            getUserDataTable()
        }
        setLoading(false);
    }, [dispatch]);

    return (
        <>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <Container>
                    <ContainerEmailPassword onClick={handleClick}>
                        <EmailPasswordForm validate={validate} formValues={addFormValues} handleAddFormChange={handleAddFormChange} />
                    </ContainerEmailPassword>

                    <Height />

                    <ContainerAccessInfomation>
                        <AccessInfomation formValues={addFormValues} handleAddFormChange={handleAddFormChange} />
                    </ContainerAccessInfomation>

                    <Height />

                    <ContainerTax>
                        <TaxInfomation formValues={addFormValues} handleAddFormChange={handleAddFormChange} />
                    </ContainerTax>
                </Container>

                <ButtonCreate onClick={handleAddFormSubmit}>Create Account</ButtonCreate>

                {
                    showAlert &&
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — <strong>check it out!</strong>
                    </Alert>
                }
            </form>
        </>
    );
};

export default FormAddUser;