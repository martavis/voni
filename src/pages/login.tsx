import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'utils/gql';
import { CustomerContext } from 'state/Customer';
import gqlClient from './../gqlClient';
import { GET_ACTIVE_CUSTOMER } from './../utils/gql';
import { Customer } from 'types/vendure';

import '../assets/styles/account-related.scss';

export default () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [alertClass, setAlertClass] = useState("contact-alert-red");
    const {setToken, setCustomer}: { token: String, setToken: Function, customer: Customer, setCustomer: Function} = useContext(CustomerContext);

    let login = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setAlertClass("contact-alert-red");       
        if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) { 
            setAlertMessage("Please input correct email address.");
            return;
        }
        if (password == "") { 
            setAlertMessage("Please input password field.");
            return;
        }    
        try {
			await loginAccount({
				fetchPolicy: 'no-cache',
				variables: {
                    "userName": email, 
                    "password": password,
                    "rememberMe": false
				}
            });
		} catch (error) {
			console.log(error);
		}
    };

    const [loginAccount] = useMutation(LOGIN, {
		onCompleted: async (data) => {
			if (data) {		                
                setToken(data.login.channels[0].token);  
                const {data: result} = await gqlClient.query({
                    query: GET_ACTIVE_CUSTOMER,
                    fetchPolicy: 'no-cache',                    
                });
                setCustomer(result.activeCustomer);
                window.location.href=("/profile");
			} else {
				console.log('nope');
			}
		},
		onError: (error) => {
			console.error(error);
		}
    });    

    return (
        <div className="profile page">
            <h1 className="page-title">Log in</h1>       
            <div className="section-custom-border">
                <div className="profile-info"> 
                    <div className="input-clip-path-outside">
                        <input placeholder="Email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)}}  className="input-clip-path-inside"></input>
                    </div>
                    <div className="input-clip-path-outside">
                        <input placeholder="Password" type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}} className="input-clip-path-inside"></input>
                    </div>
                    <div>
                        <p className={alertClass}> 
                            {alertMessage}
                        </p>
                        <div className="button-clip-path-outside">
                            <button className="button-clip-path-inside" onClick={login}> 
                                SUBMIT
                            </button>            
                        </div> 
                    </div>                    
                </div>      
            </div>
        </div>
    )
};

