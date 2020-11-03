import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from 'utils/gqlMutation';

import './PrivacyInfo.scss';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

const PrivacyInfo = () => { 
    const [nPassword, setNPassword] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");   
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("alert-red"); 

    let updatePasswordEvent = ( event: React.MouseEvent<HTMLButtonElement> ) => { 
        if(cPassword != password) { 
            setAlertMessage("Password dismatch");
            return;
        }        
        updatePassword({
            fetchPolicy: 'no-cache',
            variables: {
                "old": nPassword, 
                "new": password
            }
        });		
    }

    const [updatePassword] = useMutation(CHANGE_PASSWORD, {
		onCompleted: async (data) => {
            if(data.updateCustomerPassword.success) {                
                setAlertMessage('Password update successed.');
                setAlertClass('alert-green');                  
            } else { 
                setAlertMessage(data.updateCustomerPassword.message);
                setAlertClass('alert-red');
            }
		},
    });  
    return ( 
        <div className="privacyInfo">
            <CustomInput placeholder="Current Password" type="password" value={nPassword} onChange= 
                {(event: React.ChangeEvent<HTMLInputElement>) => {setNPassword(event.target.value)} }/>
            <CustomInput placeholder="New password" type="password" value={password} onChange=
                {(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)} }/>
            <CustomInput placeholder="Confirm new password" type="password" value={cPassword} onChange=
                {(event: React.ChangeEvent<HTMLInputElement>) => {setCPassword(event.target.value)} }/>
            <CustomButton buttonText="Update" submit={updatePasswordEvent}></CustomButton>
            <p className={alertClass}> {alertMessage} </p>
        </div>
    )
}

export default PrivacyInfo;