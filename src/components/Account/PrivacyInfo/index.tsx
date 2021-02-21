import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { CustomerContext } from 'state/Customer';
import { LOGIN, UPDATE_CUSTOMER } from 'utils/gqlMutation';
import { Customer } from 'shopify-storefront-api-typings';

import './PrivacyInfo.scss';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

const PrivacyInfo = () => { 
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');   
    const {customer, setToken} : {customer: Customer, setToken: Function} = useContext(CustomerContext);
    const { addToast } = useToasts();

    const [login] = useMutation(LOGIN, {
		onCompleted: async ({ result: { customerAccessToken } }) => {
            if (customerAccessToken) {
                const { accessToken } = customerAccessToken;

                await customerUpdate({
                    fetchPolicy: 'no-cache',
                    variables: {
                        customerAccessToken: accessToken,
                        customer: {
                            password: newPassword
                        }
                    }
                });
            }
		},
		onError: (error) => {
			console.error(error);
            addToast('Your current password is incorrect.', { appearance: 'error' });
		}
    });

    const [customerUpdate] = useMutation(UPDATE_CUSTOMER, {
        onCompleted: ({ customerUpdate: { customerAccessToken, customerUserErrors } }) => {
            if (customerUserErrors && customerUserErrors.length > 0) {
                addToast(customerUserErrors[0].message, { appearance: 'error' });
            } else if (customerAccessToken) {
                setToken(customerAccessToken.accessToken, new Date(customerAccessToken.expiresAt));
                addToast('Password updated successfully.', { appearance: 'success' });
            } else {
                addToast('Something went wrong changing your password. Please try again or contact us.', { appearance: 'error' });
            }
        },
        onError: (error) => {
            console.error(error);
            addToast('Something went wrong changing your password. Please try again or contact us.', { appearance: 'error' });
        }
    });

    let submitPassword = async (e: any) => { 
        e.preventDefault();

        if (currentPassword === '') { 
            addToast('Please enter your current password.', { appearance: 'error' });
            return;
        }  
        
        if (newPassword === '' || confirmPassword === '') { 
            addToast('Please enter your new password.', { appearance: 'error' });
            return;
        }        

        if (confirmPassword !== newPassword) { 
            addToast('Passwords do not match.', { appearance: 'error' });
            return;
        }

        await login({
            fetchPolicy: 'no-cache',
            variables: { 
                input: { 
                    email: customer.email, 
                    password: currentPassword
                } 
            }
        });
    }

    return ( 
        <div className="privacyInfo">
            <form onSubmit={submitPassword}>
                <CustomInput placeholder="Current Password" type="password" value={currentPassword} onChange= 
                    {(event: React.ChangeEvent<HTMLInputElement>) => {setCurrentPassword(event.target.value)} }/>
                <CustomInput placeholder="New password" type="password" value={newPassword} onChange=
                    {(event: React.ChangeEvent<HTMLInputElement>) => {setNewPassword(event.target.value)} }/>
                <CustomInput placeholder="Confirm new password" type="password" value={confirmPassword} onChange=
                    {(event: React.ChangeEvent<HTMLInputElement>) => {setConfirmPassword(event.target.value)} }/>
                <CustomButton buttonText="Update" submit={submitPassword}></CustomButton>
            </form>
        </div>
    )
}

export default PrivacyInfo;