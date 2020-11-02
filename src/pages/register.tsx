import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_ACCOUNT } from 'utils/gqlMutation';
import { validateEmail } from 'utils/functions';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

import '../assets/styles/account-related.scss';

export default () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [lname, setLName] = useState("");
    const [fname, setFName] = useState("");
    const [alertClass, setAlertClass] = useState("alert-red");

    const [registerAccount] = useMutation(REGISTER_ACCOUNT, {
		onCompleted: (data) => {
			if (data.registerCustomerAccount.success == true) {
                setAlertClass("alert-green");
                setAlertMessage("Register Successed!");
			} 
		},
		onError: (error) => {
			console.error(error);
		}
	});

    let register = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setAlertClass("alert-red");       
        if (!validateEmail(email)) { 
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
			await registerAccount({
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
		} catch (error) {
            setAlertMessage('register error..');
		}
    };

    return (
        <div className="profile page">
            <h1 className="page-title">Register</h1>
            <div className="section-custom-border">
                <div className="profile-info"> 
                    <CustomInput placeholder="First Name" value="" type="input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setFName(event.target.value);}} />
                    <CustomInput placeholder="Last Name" value="" type="input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setLName(event.target.value);}} />
                    <CustomInput placeholder="Email" value="" type="input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value);}} />
                    <CustomInput placeholder="Password" value="" type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value);}} />
                    <CustomInput placeholder="Confirm Password" value="" type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setConfirmPassword(event.target.value);}} />
                    <p className={alertClass}> {alertMessage} </p>
                    <CustomButton submit={register} buttonText="Submit" />
                </div>      
            </div>
        </div>
    )
};

