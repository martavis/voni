import React, { useState, useEffect, useContext } from 'react';
import { Customer, UpdateCustomerInput } from 'types/vendure';
import { useMutation } from '@apollo/client';
import { GET_ACTIVE_CUSTOMER } from 'utils/gqlQuery';
import { UPDATE_CUSTOMER_DETAILS } from 'utils/gqlMutation';
import gqlClient from 'utils/gqlClient';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

// import { validateEmail } from 'utils/functions';
import { CustomerContext } from 'state/Customer';
import './ProfileInfo.scss';

const ProfileInfo = () => {  
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("alert-red"); 
    const {setCustomer} : {customer: Customer, setCustomer: Function} = useContext(CustomerContext);

    const [uCustomer, setUCustomer] = useState({        
        title: '', 
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: ''
    });

    useEffect( () => { 
        getCustomers();        
    }, []);

    let getCustomers = async () => { 
        const {data: { activeCustomer }} = await gqlClient.query({
            query: GET_ACTIVE_CUSTOMER,
            fetchPolicy: 'no-cache'
        });
        setUCustomer(activeCustomer);         
    }

    let updateProfileInfo = ( event: React.MouseEvent<HTMLButtonElement> ) => {    
        const input: UpdateCustomerInput = {
            title: uCustomer.title,
            firstName: uCustomer.firstName,
            lastName: uCustomer.lastName,
            phoneNumber: uCustomer.phoneNumber,
        };

        updateProfile({
            fetchPolicy: 'no-cache',
            variables: {
                input: input
            }
        });		
    }

    const [updateProfile] = useMutation(UPDATE_CUSTOMER_DETAILS, {
		onCompleted: async (data) => {
            if(data.updateCustomer) {                
                setAlertMessage('Profile update successed.');
                setAlertClass('alert-green');      
            } 
            setCustomer(data.updateCustomer)
		},
		onError: (error) => {
			console.error(error);
		}
    });    

    return ( 
        <div className="profileInfo">
            <CustomInput placeholder="Title" type="input" value={uCustomer.title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUCustomer({...uCustomer, title:event.target.value})}} />
            <CustomInput placeholder="First Name" type="input" value={uCustomer.firstName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUCustomer({...uCustomer, firstName:event.target.value})}} />
            <CustomInput placeholder="Last Name" type="input" value={uCustomer.lastName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUCustomer({...uCustomer, lastName:event.target.value})}} />
            <CustomInput placeholder="Email" type="input" value={uCustomer.emailAddress} enable={false} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUCustomer({...uCustomer, emailAddress:event.target.value})}} />
            <CustomInput placeholder="Phone Number" type="input" value={uCustomer.phoneNumber} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUCustomer({...uCustomer, phoneNumber:event.target.value})}} />
            <CustomButton buttonText="Update" submit={updateProfileInfo}></CustomButton>
            <p className={alertClass}> {alertMessage} </p>
        </div>
    );
};

export default ProfileInfo;