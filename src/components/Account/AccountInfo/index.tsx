import React, { useState, useContext } from 'react';
import { Customer } from 'shopify-storefront-api-typings';
import { useMutation } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { CustomerContext } from 'state/Customer';
import { UPDATE_CUSTOMER } from 'utils/gqlMutation';
import { validateEmail } from 'utils/functions';

import './AccountInfo.scss';

import CustomButton from 'components/CustomButton';
import CustomInput from 'components/CustomInput';

const AccountInfo = () => {  
    const {token, customer, setCustomer} : {token: String, customer: Customer, setCustomer: Function} = useContext(CustomerContext);
    const { addToast } = useToasts();

    const [customerUpdate] = useMutation(UPDATE_CUSTOMER, {
        onCompleted: () => {
            addToast('Account updated successfully.', { appearance: 'success' });
        },
        onError: (error) => {
            console.error(error);
            addToast('Something went wrong updating your account. Please try again or contact us.', { appearance: 'error' });
        }
    });    

    const updateAccountInfo = async (e: any) => {    
        e.preventDefault();

        if (!validateEmail(customer.email)) { 
            addToast('Please add a valid email address address.', { appearance: 'error' });
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
        </div>
    );
};

export default AccountInfo;