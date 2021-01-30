import React, { useState, useEffect, useContext } from 'react';
import { Customer } from 'shopify-storefront-api-typings';
import { useMutation } from '@apollo/client';
import { UPDATE_CUSTOMER } from 'utils/gqlMutation';
import gqlClient from 'utils/gqlClient';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

import { validateEmail } from 'utils/functions';
import { CustomerContext } from 'state/Customer';
import './AccountInfo.scss';

const AccountInfo = () => {  
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("alert-red"); 
    const {token, customer, setCustomer} : {token: String, customer: Customer, setCustomer: Function} = useContext(CustomerContext);

    const [customerUpdate] = useMutation(UPDATE_CUSTOMER, {
        onCompleted: async (data) => {
            setAlertClass('alert-green');      
            setAlertMessage('Account update successful.');
        },
        onError: (error) => {
            console.error(error);
        }
    });    

    const updateAccountInfo = async (e: any) => {    
        e.preventDefault();
        setAlertClass('alert-red');      

        if (!validateEmail(customer.email)) { 
            setAlertMessage('Please add a valid email address address.');
            return;
        }

        await customerUpdate({
            fetchPolicy: 'no-cache',
            variables: {
                customerAccessToken: token,
                customer: {
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    email: customer.email,
                    phone: customer.phone
                }
            }
        });		
    }


    return ( 
        <div className="accountInfo">
            <form onSubmit={updateAccountInfo}>
                <div className="two-comlumns-responsive">
                    <CustomInput placeholder="First Name" type="input" value={customer?.firstName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCustomer({...customer, firstName: event.target.value})}} />
                    <CustomInput placeholder="Last Name" type="input" value={customer?.lastName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCustomer({...customer, lastName: event.target.value})}} />
                </div>       
                <div className="two-comlumns-responsive">
                    <CustomInput placeholder="Email" type="input" value={customer?.email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCustomer({...customer, email: event.target.value})}} />
                    <CustomInput placeholder="Phone Number" type="input" value={customer?.phone} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCustomer({...customer, phone: event.target.value})}} />
                </div>
                <CustomButton buttonText="Update" submit={updateAccountInfo}></CustomButton>
            </form>
            <p className={alertClass}> {alertMessage} </p>
        </div>
    );
};

export default AccountInfo;