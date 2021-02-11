import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Customer } from 'shopify-storefront-api-typings';
import { LOGIN, UPDATE_CUSTOMER } from 'utils/gqlMutation';
import { CustomerContext } from 'state/Customer';

import './PrivacyInfo.scss';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

const PrivacyInfo = () => { 
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');   
    const [alertMessage, setAlertMessage] = useState('');
    const [alertClass, setAlertClass] = useState('alert-red'); 
    const {customer, setToken} : {customer: Customer, setToken: Function} = useContext(CustomerContext);

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
            setAlertClass('alert-red');      
            setAlertMessage('Your current password is incorrect.');
		}
    });

    const [customerUpdate] = useMutation(UPDATE_CUSTOMER, {
        onCompleted: ({ customerUpdate: { customerAccessToken, customerUserErrors } }) => {
            if (customerUserErrors && customerUserErrors.length > 0) {
                setAlertClass('alert-red');      
                setAlertMessage(customerUserErrors[0].message);
            } else if (customerAccessToken) {
                setToken(customerAccessToken.accessToken, new Date(customerAccessToken.expiresAt));
                setAlertClass('alert-green');      
                setAlertMessage('Password updated successfully.');
            } else {
                setAlertClass('alert-red');
                setAlertMessage('Something went wrong changing your password.');
            }
        },
        onError: (error) => {
            console.error(error);
        }
    });

    let submitPassword = async (e: any) => { 
        e.preventDefault();

        if (currentPassword === '') { 
            setAlertMessage('Please enter your current password.');
            return;
        }  
              
        if (newPassword === '' || confirmPassword === '') { 
            setAlertMessage('Please enter your new password.');
            return;
        }        

        if (confirmPassword !== newPassword) { 
            setAlertMessage('Passwords do not match');
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
                <p className={alertClass}> {alertMessage} </p>
            </form>
        </div>
    )
}

export default PrivacyInfo;