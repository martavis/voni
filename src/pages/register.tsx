import React, { useEffect, useState, useContext } from 'react';
import { Head } from 'react-static';
import { navigate } from '@reach/router';
import { useMutation } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { CustomerContext } from 'state/Customer';
import { ShippingContext } from 'state/Shipping';
import { REGISTER_ACCOUNT, LOGIN } from 'utils/gqlMutation';
import { validateEmail } from 'utils/functions';
import { MailingAddress } from 'shopify-storefront-api-typings';

import '../assets/styles/account.scss';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

export default () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [customerId, setCustomerId] = useState(null);
    const {setToken, setCustomer}: { setToken: Function, setCustomer: Function } = useContext(CustomerContext);
    const {setShipping} : {shipping: MailingAddress, setShipping: Function} = useContext(ShippingContext);
    const { addToast } = useToasts();

    const [registerAccount] = useMutation(REGISTER_ACCOUNT, {
		onCompleted: ({ result: { customer } }) => {
            setCustomerId(customer.id);
		},
		onError: (error) => {
			console.error(error);
            addToast('We could not complete your registration. Please contact us.', { appearance: 'error' });
		}
    });

    const [login] = useMutation(LOGIN, {
		onCompleted: ({ result: { customerAccessToken } }) => {
            const {accessToken, expiresAt } = customerAccessToken;
            setToken(accessToken, new Date(expiresAt));
            setCustomer({ id: customerId, email, firstName, lastName, phone: null });
            setShipping({});
            navigate('/shop');
		},
		onError: (error) => {
			console.error(error);
            addToast('We could not complete your registration. Please contact us.', { appearance: 'error' });
		}
    });
    
    useEffect(() => {
        const logIn = async () => {
            await login({
                fetchPolicy: 'no-cache',
				variables: {
					input: { email, password }
				}
            });
        };
        
        if (customerId) {
            logIn();
        }
    }, [customerId]);

    let register = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) { 
            addToast('Please add a valid email address address.', { appearance: 'error' });
            return;
        }

        if ((password === '') || (confirmPassword === '') || (lastName === '') || (firstName === '')) { 
            addToast('Please enter all information.', { appearance: 'error' });
            return;
        }

        if (password !== confirmPassword) { 
            addToast('The passwords do not match.', { appearance: 'error' });
            return;
        }
        
        try {
			await registerAccount({
				fetchPolicy: 'no-cache',
				variables: {
					input : { email, password, firstName, lastName }
				}
            });
		} catch (error) {
            addToast('We could not complete your registration. Please contact us.', { appearance: 'error' });
		}
    };

    return (
        <div className="register page-form">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Register | Voni Aesthetics</title>
                <meta name="description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
                <meta name="keywords" content="Voni, Aesthetics, clothing, apparel, fashion, accessories"></meta>
                <meta property="og:title" content="Register | Voni Aesthetics" />
                <meta property="og:description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://voni.us/register" />
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
            <h1 className="page-title">Register</h1>
            <div className="section-custom-border">
                <div className="account-info"> 
                    <form onSubmit={register}>
                        <CustomInput placeholder="First Name" value={firstName} type="input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setFirstName(event.target.value);}} />
                        <CustomInput placeholder="Last Name" value={lastName} type="input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setLastName(event.target.value);}} />
                        <CustomInput placeholder="Email" value={email} type="input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value);}} />
                        <CustomInput placeholder="Password" value={password} type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value);}} />
                        <CustomInput placeholder="Confirm Password" value={confirmPassword} type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setConfirmPassword(event.target.value);}} />
                        <CustomButton submit={register} buttonText="Submit" />
                    </form>
                </div>      
            </div>
        </div>
    )
};

