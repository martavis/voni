import React, { useState, useContext, useEffect } from 'react';
import { navigate } from '@reach/router';
import { useMutation } from '@apollo/client';
import gqlClient from 'utils/gqlClient';
import { LOGIN } from 'utils/gqlMutation';
import { GET_CUSTOMER } from 'utils/gqlQuery';
import { CustomerContext } from 'state/Customer';
import { ShippingContext } from 'state/Shipping';
import { validateEmail } from 'utils/functions';
import { MailingAddress } from 'shopify-storefront-api-typings';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

import '../assets/styles/account.scss';

export default () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');    
    const {token, setToken, setCustomer}: { token: String, setToken: Function, setCustomer: Function } = useContext(CustomerContext);
    const {setShipping} : {shipping: MailingAddress, setShipping: Function} = useContext(ShippingContext);

    const [login] = useMutation(LOGIN, {
		onCompleted: ({ result: { customerAccessToken } }) => {
            const {accessToken, expiresAt } = customerAccessToken;
            setToken(accessToken, new Date(expiresAt));
		},
		onError: (error) => {
			console.error(error);
		}
    });

    useEffect(() => {
        const getCustomerInfo = async () => {
            const { data: { customer } } = await gqlClient.query({
                query: GET_CUSTOMER,
                fetchPolicy: 'no-cache',
                variables: { customerAccessToken: token }
            });

            const { id, firstName, lastName, phone, addresses } = customer;
            setCustomer({ id, email, firstName, lastName, phone });

            const address = addresses.edges.length > 0 ? addresses.edges[0].node : {};
            setShipping(address);
            navigate('/shop');
        };
        
        if (token) {
            console.log(token)
            getCustomerInfo();
        }
    }, [token]);

    const submitLogin = async (e: any) => {   
        e.preventDefault();

        if (password == '') { 
            setAlertMessage('Please input password field.');
            return;
        }

        if (!validateEmail(email) ) { 
            setAlertMessage('Please add a valid email address');
            return;
        }      

        await login({
            fetchPolicy: 'no-cache',
            variables: { input: { email, password } }
        });		
    };

    return (
        <div className="account page-form">
            <h1 className="page-title">Log in</h1>       
            <div className="section-custom-border">
                <div className="account-info"> 
                    <form onSubmit={submitLogin}>
                        <CustomInput placeholder="Email" type="input" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setEmail(event.target.value)}/>
                        <CustomInput placeholder="Password" type="password" value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setPassword(event.target.value)}/>                        
                        <CustomButton buttonText="Submit" submit={submitLogin}/> 
                        <p className="alert-red"> {alertMessage} </p>
                    </form>
                </div>      
            </div>
        </div> 
    )
};

