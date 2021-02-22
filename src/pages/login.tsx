import React, { useState, useContext, useEffect } from 'react';
import { Head } from 'react-static';
import { navigate } from '@reach/router';
import { useMutation } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { CustomerContext } from 'state/Customer';
import { ShippingContext } from 'state/Shipping';
import gqlClient from 'utils/gqlClient';
import { LOGIN } from 'utils/gqlMutation';
import { GET_CUSTOMER } from 'utils/gqlQuery';
import { validateEmail } from 'utils/functions';
import { MailingAddress } from 'shopify-storefront-api-typings';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

import '../assets/styles/account.scss';

export default () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');    
    const {token, setToken, setCustomer}: { token: String, setToken: Function, setCustomer: Function } = useContext(CustomerContext);
    const {setShipping} : {shipping: MailingAddress, setShipping: Function} = useContext(ShippingContext);
    const { addToast } = useToasts();

    const [login] = useMutation(LOGIN, {
		onCompleted: ({ result: { customerAccessToken } }) => {
            if (customerAccessToken) {
                const {accessToken, expiresAt } = customerAccessToken;
                setToken(accessToken, new Date(expiresAt));
            } else {
                addToast('Your email or password is incorrect.', { appearance: 'error' });
            }
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
            getCustomerInfo();
        }
    }, [token]);

    const submitLogin = async (e: any) => {   
        e.preventDefault();

        if (password == '') { 
            addToast('Please enter your password.', { appearance: 'error' });
            return;
        }

        if (!validateEmail(email) ) { 
            addToast('Please add a valid email address.', { appearance: 'error' });
            return;
        }      

        await login({
            fetchPolicy: 'no-cache',
            variables: { input: { email, password } }
        });		
    };

    return (
        <div className="login page-form">
            <Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Log In | Voni Aesthetics</title>
				<meta name="description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
				<meta name="keywords" content="Voni, Aesthetics, clothing, apparel, fashion, accessories"></meta>
				<meta property="og:title" content="Log In | Voni Aesthetics" />
				<meta property="og:description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://voni.us/login" />
				<meta property="og:image" content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png" />
				<meta property="og:image:secure_url" content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png" />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="1366" />
				<meta property="og:image:height" content="768" />
				<meta property="og:image:alt" content="Voni Aesthetics" />
				<link rel="apple-touch-icon" sizes="180x180" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-16x16.png" />
				<link rel="manifest" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/site.webmanifest" />
				<link rel="mask-icon" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/safari-pinned-tab.svg" color="#3a551a" />
				<meta name="msapplication-TileColor" content="#00a300" />
				<meta name="theme-color" content="#ffffff"></meta>
			</Head>
            <h1 className="page-title">Log In</h1>       
            <div className="section-custom-border">
                <div className="account-info"> 
                    <form onSubmit={submitLogin}>
                        <CustomInput placeholder="Email" type="input" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setEmail(event.target.value)}/>
                        <CustomInput placeholder="Password" type="password" value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setPassword(event.target.value)}/>                        
                        <CustomButton buttonText="Submit" submit={submitLogin}/> 
                    </form>
                </div>      
            </div>
        </div> 
    )
};

