import React, { useEffect, useState  } from 'react';
import gqlClient from 'utils/gqlClient';
import { useMutation } from '@apollo/client';
import { UPDATE_ADDRESS, CREATE_ADDRESS } from 'utils/gqlMutation';
import { GET_CUSTOMER_ADDRESSES } from 'utils/gqlQuery';
import { UpdateAddressInput, CreateAddressInput } from 'types/vendure';
import './ShippingInfo.scss';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';
import CustomCountrySelect from 'components/CustomCountrySelect';

import { addressValidation, getShipment } from 'utils/functions';

type props = { 
    isCheckout : boolean,
    isCheckoutPayment: boolean,
    changeValue: Function
}

const ShippingInfo = ( { isCheckout, isCheckoutPayment, changeValue }: props) => { 
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("alert-red"); 
    const [isCreate, setIsCreate] = useState(false);
    const [uAddress, setUAddress] = useState({
        id: '',     
        streetLine1: '', 
        streetLine2: '',
        city: '',
        province: '',
        postalCode: '',
        country : { 
            code : '', 
            name : ''
        }
    });

    useEffect( () => { 
        if(!isCheckoutPayment) { 
            getCustomerAddress();
        }        
    }, []); 

    let getCustomerAddress = async () => { 
        const {data: data } = await gqlClient.query({
            query: GET_CUSTOMER_ADDRESSES,
            fetchPolicy: 'no-cache'
        });
        if(data.activeCustomer.addresses[0]) { 
            setUAddress(data.activeCustomer.addresses[0]);
            setIsCreate(false);
        } else { 
            setIsCreate(true);
        }
    }

    let updateShippingInfo = async () => {
        if ( !isCreate ) {             
            const input: UpdateAddressInput = {
                id: uAddress.id,
                streetLine1: uAddress.streetLine1,
                streetLine2: uAddress.streetLine2,
                city: uAddress.city,
                province: uAddress.province,
                postalCode: uAddress.postalCode,
                countryCode: uAddress.country.code
            };
            var validate = await addressValidation(input);
            getShipment(input);
            if (validate) {                 
                updateAddress({
                    fetchPolicy: 'no-cache',
                    variables: {
                        input: input
                    }
                });	
            } else { 
                setAlertMessage("Please input right address !")                
            }
        } else { 
            const input: CreateAddressInput = {
                streetLine1: uAddress.streetLine1,
                streetLine2: uAddress.streetLine2,
                city: uAddress.city,
                province: uAddress.province,
                postalCode: uAddress.postalCode,
                countryCode: uAddress.country.code
            };
            createAddress({
                fetchPolicy: 'no-cache',
                variables: {
                    input: input
                }
            });	
        }
    }

    const [updateAddress] = useMutation(UPDATE_ADDRESS, {
		onCompleted: async (data) => {
            if(data) {                
                setAlertMessage('Address update successed.');
                setAlertClass('alert-green');     
            } 
		},
		onError: (error) => {
			console.error(error);
		}
    });    

    const [createAddress] = useMutation(CREATE_ADDRESS, {
		onCompleted: async (data) => {
            if(data) {                
                setAlertMessage('Address create successed.');
                setAlertClass('alert-green');  
                console.log(data);   
            } 
		},
		onError: (error) => {
			console.error(error);
		}
    });  

    let selectCountry = (value : any) => { 
        setUAddress({ 
            ...uAddress,
            country : { 
                code : value.value, 
                name : value.label
            }
        });
        changeValue(uAddress);
    }

    return (
        <div className="shippingInfo">                     
            <CustomInput placeholder="Address" type="input" enable={isCheckout? false : true} value={uAddress.streetLine1} onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                {setUAddress({...uAddress, streetLine1:event.target.value}); changeValue(uAddress);}} />                
            <CustomInput placeholder="Apartment, Suit, Etc.(Optional)" enable={isCheckout? false : true} type="input" value={uAddress.streetLine2} onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                {setUAddress({...uAddress, streetLine2:event.target.value}); changeValue(uAddress);}} />    
            <CustomInput placeholder="City" type="input" enable={isCheckout? false : true} value={uAddress.city} onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                {setUAddress({...uAddress, city:event.target.value}); changeValue(uAddress);}} />                
            <CustomInput placeholder="Province" type="input" enable={isCheckout? false : true} value={uAddress.province} onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                {setUAddress({...uAddress, province:event.target.value}); changeValue(uAddress);}} />                
			<div className="two-comlumns-responsive">
                <CustomCountrySelect onChange={selectCountry} value={uAddress.country}/>    
                <CustomInput placeholder="Post Code" type="input" value={uAddress.postalCode} onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                    {setUAddress({...uAddress, postalCode:event.target.value}); changeValue(uAddress);}} enable={isCheckout? false : true} />    				
			</div>
            {
                !isCheckout && !isCheckoutPayment? <>    
                    <CustomButton buttonText="Update" submit={updateShippingInfo}></CustomButton>
                    <p className={alertClass}> {alertMessage} </p>
                </> : ''
            }
        </div>
    );
}

ShippingInfo.defaultProps = {
    isCheckout: false, 
    isCheckoutPayment: false,
    changeValue : Function    
}
export default ShippingInfo;