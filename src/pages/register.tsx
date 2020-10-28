import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_ACCOUNT } from 'utils/gql';

import '../assets/styles/account-related.scss';

export default () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [lname, setLName] = useState("");
    const [fname, setFName] = useState("");
    const [alertClass, setAlertClass] = useState("contact-alert-red");

    const [registerAccount] = useMutation(REGISTER_ACCOUNT, {
		onCompleted: (data) => {
			if (data) {
				// setCart(data.cart);
			} else {
				console.log('nope');
			}
		},
		onError: (error) => {
			console.error(error);
		}
	});

    let register = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setAlertClass("contact-alert-red");
       
        if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) { 
            setAlertMessage("Please input correct email address.");
            return;
        }
        if ((password == "") || (confirmPassword == "") || (lname == "") || (fname == "")) { 
            setAlertMessage("Please input all fields.");
            return;
        }
        if (password != confirmPassword) { 
            setAlertMessage("Password dismatch!");
            return;
        }
        setAlertMessage('register now..');
        try {
			let result = await registerAccount({
				fetchPolicy: 'no-cache',
				variables: {
					"customerAccount" : { 
                        "emailAddress": email, 
                        "password": password,
                        "firstName": fname,
                        "lastName": lname
                    }
				}
            });
            if(result.data.registerCustomerAccount.success == true) { 
                setAlertClass("contact-alert-green");
                setAlertMessage("Register Successed!");
            }
		} catch (error) {
            setAlertMessage('register now error..');
			console.log(error);
		}
    };

    return (
        <div className="profile page">
            <h1 className="page-title">Register</h1>
            <div className="section-custom-border">
                <div className="profile-info"> 
                    <div className="input-clip-path-outside">
                        <input placeholder="First Name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setFName(event.target.value);}} className="input-clip-path-inside" required></input>
                    </div>
                    <div className="input-clip-path-outside">
                        <input placeholder="Last Name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setLName(event.target.value);}} className="input-clip-path-inside" required></input>
                    </div>
                    <div className="input-clip-path-outside">
                        <input placeholder="Email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value);}} className="input-clip-path-inside" required></input>
                    </div>
                    <div className="input-clip-path-outside">
                        <input placeholder="Password" type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value);}} className="input-clip-path-inside"></input>
                    </div>
                    <div className="input-clip-path-outside">
                        <input placeholder="Confirm Password" type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setConfirmPassword(event.target.value);}} className="input-clip-path-inside"></input>
                    </div>
                    <div>
                        <p className={alertClass}> 
                            {alertMessage}
                        </p>
                        <div className="button-clip-path-outside">
                            <button className="button-clip-path-inside" onClick={register}> 
                                SUBMIT
                            </button>            
                        </div> 
                    </div>                    
                </div>      
            </div>
        </div>
    )
};

