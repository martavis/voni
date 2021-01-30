import React, { useEffect, useState, useContext } from 'react';
import { navigate } from '@reach/router';
import { useMutation } from '@apollo/client';
import { CustomerContext } from 'state/Customer';
import { REGISTER_ACCOUNT, LOGIN } from 'utils/gqlMutation';
import { validateEmail } from 'utils/functions';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

import '../assets/styles/account-related.scss';

export default () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [customerId, setCustomerId] = useState(null);
    const [alertClass, setAlertClass] = useState('alert-red');
    const {setToken, setCustomer}: { setToken: Function, setCustomer: Function } = useContext(CustomerContext);

    const [registerAccount] = useMutation(REGISTER_ACCOUNT, {
		onCompleted: ({ result: { customer } }) => {
            setAlertClass('alert-green');
            setAlertMessage('loading...');
            setCustomerId(customer.id);
		},
		onError: (error) => {
			console.error(error);
		}
    });

    const [login] = useMutation(LOGIN, {
		onCompleted: ({ result: { customerAccessToken } }) => {
            const {accessToken, expiresAt } = customerAccessToken;
            setToken(accessToken, new Date(expiresAt));
            setCustomer({ email, firstName, lastName });
            navigate('/shop');
		},
		onError: (error) => {
			console.error(error);
		}
    });
    
    useEffect(() => {
        const logIn = async () => {
            await login({
                fetchPolicy: 'no-cache',
				variables: {
					input : { email, password }
				}
            });
        };
        
        if (customerId) {
            logIn();
        }
    }, [customerId]);

    let register = async (e) => {
        e.preventDefault();
        setAlertClass('alert-red');      

        if (!validateEmail(email)) { 
            setAlertMessage('Please input correct email address.');
            return;
        }

        if ((password === '') || (confirmPassword === '') || (lastName === '') || (firstName === '')) { 
            setAlertMessage('Please input all fields.');
            return;
        }

        if (password !== confirmPassword) { 
            setAlertMessage('Password dismatch!');
            return;
        }
        
        setAlertMessage('register now..');
        try {
			await registerAccount({
				fetchPolicy: 'no-cache',
				variables: {
					input : { email, password, firstName, lastName }
				}
            });
		} catch (error) {
            setAlertMessage('register error..');
		}
    };

    return (
        <div className="profile page">
            <h1 className="page-title">Register</h1>
            <div className="section-custom-border">
                <div className="profile-info"> 
                    <form onSubmit={register}>
                        <CustomInput placeholder="First Name" value={firstName} type="input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setFirstName(event.target.value);}} />
                        <CustomInput placeholder="Last Name" value={lastName} type="input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setLastName(event.target.value);}} />
                        <CustomInput placeholder="Email" value={email} type="input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value);}} />
                        <CustomInput placeholder="Password" value={password} type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value);}} />
                        <CustomInput placeholder="Confirm Password" value={confirmPassword} type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setConfirmPassword(event.target.value);}} />
                        <p className={alertClass}> {alertMessage} </p>
                        <CustomButton submit={register} buttonText="Submit" />
                    </form>
                </div>      
            </div>
        </div>
    )
};

