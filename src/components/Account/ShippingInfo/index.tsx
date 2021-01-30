import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ADDRESS, UPDATE_ADDRESS } from 'utils/gqlMutation';
import { ShippingContext } from 'state/Shipping';
import { CustomerContext } from 'state/Customer';
import { MailingAddress } from 'shopify-storefront-api-typings';

import './ShippingInfo.scss';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';
import CustomCountrySelect from 'components/CustomCountrySelect';

const ShippingInfo = () => { 
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("alert-red"); 
    const [isCreate, setIsCreate] = useState(false);
    const {token}: { token: String } = useContext(CustomerContext);
    const {shipping, setShipping} : {shipping: MailingAddress, setShipping: Function} = useContext(ShippingContext);
    
    const [customerAddressCreate] = useMutation(CREATE_ADDRESS, {
		onCompleted: () => {
            setAlertClass('alert-green');     
            setAlertMessage('Created address successfully.');
		},
		onError: (error) => {
			console.error(error);
		}
    });    

    const [customerAddressUpdate] = useMutation(UPDATE_ADDRESS, {
		onCompleted: () => {
            setAlertClass('alert-green');     
            setAlertMessage('Updated address successfully.');
		},
		onError: (error) => {
			console.error(error);
		}
    });  

    const updateShippingInfo = async (e: any) => {    
        e.preventDefault();

        let params: any = {
            fetchPolicy: 'no-cache',
            variables: {
                customerAccessToken: token,
                address: {
                    firstName: shipping.firstName,
                    lastName: shipping.lastName,
                    address1: shipping.address1,
                    address2: shipping.address2,
                    city: shipping.city,
                    province: shipping.province,
                    country: shipping.country,
                    zip: shipping.zip
                }
            }
        };

        if (shipping.id) {
            params.variables.id = shipping.id;
            await customerAddressUpdate(params);		
        } else {
            await customerAddressCreate(params);		
        }
    }

    const handleAddressPart = (key: string, value: string) => {
        const newAddress = { ...shipping, [key]: value };
        setShipping(newAddress); 
    };
    
    const selectCountry = (value: any) => { 
        const newAddress = { ...shipping, country: value.value };
        setShipping(newAddress);
    };

    return (
        <div className="shippingInfo">
            <form onSubmit={updateShippingInfo}>
                <div className="two-comlumns-responsive">
                    <CustomInput 
                        placeholder="First Name" 
                        type="input" 
                        value={shipping.firstName} 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('firstName', event.target.value) } 
                    />  
                    <CustomInput 
                        placeholder="Last Name" 
                        type="input" 
                        value={shipping.lastName} 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('lastName', event.target.value) } 
                    />
                </div>
                <CustomInput 
                    placeholder="Address" 
                    type="input" 
                    value={shipping.address1} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('address1', event.target.value) } 
                />        
                <CustomInput 
                    placeholder="Apartment, Suit, Etc.(Optional)" 
                    type="input" 
                    value={shipping.address2} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('address2', event.target.value) } 
                />
                <CustomInput 
                    placeholder="City" 
                    type="input" 
                    value={shipping.city} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('city', event.target.value) } 
                />
                <CustomInput 
                    placeholder="State/Province" 
                    type="input" 
                    value={shipping.province} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('province', event.target.value) } 
                /> 
                <div className="two-comlumns-responsive">
                    <CustomCountrySelect 
                        value={shipping.country}  
                        onChange={(value: any) => selectCountry(value)}
                    />
                    <CustomInput 
                        placeholder="Zip Code" 
                        type="input" 
                        value={shipping.zip} 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('zip', event.target.value) } 
                    />
                </div>
                <CustomButton buttonText="Update" submit={updateShippingInfo}></CustomButton>
            </form>                  
            <p className={alertClass}> {alertMessage} </p>
        </div>
    );
}

ShippingInfo.defaultProps = {
    isCheckout: false, 
    isCheckoutPayment: false,
    changeValue : Function    
}
export default ShippingInfo;