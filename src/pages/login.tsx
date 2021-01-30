import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'utils/gqlMutation';
import { CustomerContext } from 'state/Customer';
import { validateEmail } from 'utils/functions';

import { GET_ACTIVE_CUSTOMER } from 'utils/gqlQuery';
import gqlClient from 'utils/gqlClient';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

import '../assets/styles/account-related.scss';

export default () => {
    const {setToken, setCustomer}: { setToken: Function, setCustomer: Function } = useContext(CustomerContext);

    const [alertMessage, setAlertMessage] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");    

    let login = async (event: React.MouseEvent<HTMLButtonElement>) => {        
        if ( password == "") { 
            setAlertMessage("Please input password field.");
            return;
        }
        if( !validateEmail(email) ) { 
            setAlertMessage("Please input correct Email");
            return;
        }        
        await loginAccount({
            fetchPolicy: 'no-cache',
            variables: {
                "userName": email, 
                "password": password,
                "rememberMe": false
            }
        });		
    };

    const [loginAccount] = useMutation(LOGIN, {
		onCompleted: async (data) => {
            if(data.login.channels) {                
                await getCustomers();
                setToken(data.login.channels[0].token);
                navigate('/profile');
            } else { 
                setAlertMessage("Email or password incorrect.");
            }
		},
		onError: (error) => {
			console.error(error);
		}
    });    

    let getCustomers = async () => { 
        const {data: { activeCustomer }} = await gqlClient.query({
            query: GET_ACTIVE_CUSTOMER,
            fetchPolicy: 'no-cache'
        });
        setCustomer(activeCustomer);       
    }

    return (
        <div className="profile page">
            <h1 className="page-title">Log in</h1>       
            <div className="section-custom-border">
                <div className="profile-info"> 
                    <CustomInput placeholder="Email" type="input" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setEmail(event.target.value)}/>
                    <CustomInput placeholder="Password" type="password" value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setPassword(event.target.value)}/>                        
                    <CustomButton buttonText="Submit" submit={login}/> 
                    <p className="alert-red"> {alertMessage} </p>
                </div>      
            </div>
        </div> 
    )
};

