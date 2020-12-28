import React, { useEffect, useState  } from 'react';
import gqlClient from 'utils/gqlClient';
import { useMutation } from '@apollo/client';
import { UPDATE_ADDRESS, CREATE_ADDRESS } from 'utils/gqlMutation';
import { GET_CUSTOMER_ADDRESSES } from 'utils/gqlQuery';
import { MailingAddressInput } from 'shopify-storefront-api-typings';
import './ShippingInfo.scss';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';
import CustomCountrySelect from 'components/CustomCountrySelect';

type props = { 
    isCheckout : boolean,
    isCheckoutPayment: boolean,
    changeValue: Function
}

const ShippingInfo = ({ isCheckout, isCheckoutPayment, changeValue }: props) => { 
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("alert-red"); 
    const [isCreate, setIsCreate] = useState(false);
    const [uAddress, setUAddress] = useState({
        address1: '', 
		address2: '',
        city: '',
		company: '',
		country: '',
		firstName: '',
		lastName: '',
		phone: '',
        province: '',
		zip: ''
    });

    /* ======= ALL COMMENTED CODE IS FOR PROFILE ======= */

    // useEffect( () => { 
    //     if(!isCheckoutPayment) { 
    //         getCustomerAddress();
    //     }        
    // }, []); 

    // let getCustomerAddress = async () => { 
    //     const {data: data } = await gqlClient.query({
    //         query: GET_CUSTOMER_ADDRESSES,
    //         fetchPolicy: 'no-cache'
    //     });
    //     if(data.activeCustomer.addresses[0]) { 
    //         setUAddress(data.activeCustomer.addresses[0]);
    //         setIsCreate(false);
    //     } else { 
    //         setIsCreate(true);
    //     }
    // }

    // let updateShippingInfo = async () => {
    //     if ( !isCreate ) {             
    //         const input: MailingAddressInput = {
    //             address1: uAddress.address1,
    //             address2: uAddress.address2,
    //             city: uAddress.city,
    //             company: uAddress.company,
    //             country: uAddress.country,
    //             firstName: uAddress.firstName,
    //             lastName: uAddress.lastName,
    //             phone: uAddress.phone,
    //             province: uAddress.province,
    //             zip: uAddress.zip
    //         };
    //         // TODO: Do address validation and update the address via Vendure gql
    //         // var validate = await addressValidationFunc(input);
    //         // getShipment(input);
    //         // if (validate) {                 
    //         //     updateAddress({
    //         //         fetchPolicy: 'no-cache',
    //         //         variables: {
    //         //             input: input
    //         //         }
    //         //     });	
    //         // } else { 
    //         //     setAlertMessage("Please input right address !")                
    //         // }
    //     } else { 
    //         const input: CreateAddressInput = {
    //             streetLine1: uAddress.streetLine1,
    //             streetLine2: uAddress.streetLine2,
    //             city: uAddress.city,
    //             province: uAddress.province,
    //             postalCode: uAddress.postalCode,
    //             countryCode: uAddress.country.code
    //         };
    //         createAddress({
    //             fetchPolicy: 'no-cache',
    //             variables: {
    //                 input: input
    //             }
    //         });	
    //     }
    // }

    // const [updateAddress] = useMutation(UPDATE_ADDRESS, {
	// 	onCompleted: async (data) => {
    //         if(data) {                
    //             setAlertMessage('Address update successed.');
    //             setAlertClass('alert-green');     
    //         } 
	// 	},
	// 	onError: (error) => {
	// 		console.error(error);
	// 	}
    // });    

    // const [createAddress] = useMutation(CREATE_ADDRESS, {
	// 	onCompleted: async (data) => {
    //         if(data) {                
    //             setAlertMessage('Address create successed.');
    //             setAlertClass('alert-green');  
    //             console.log(data);   
    //         } 
	// 	},
	// 	onError: (error) => {
	// 		console.error(error);
	// 	}
    // });  

    const handleAddressPart = (key: string, value: string) => {
        setUAddress({
            ...uAddress, 
            [key]: value
        }); 
        changeValue(uAddress);
    };

    // const selectCountry = (value: any) => { 
    //     setUAddress({ 
    //         ...uAddress,
    //         country: { 
    //             code: value.value, 
    //             name: value.label
    //         }
    //     });
    //     changeValue(uAddress);
    // };

    return (
        <div className="shippingInfo">                     
            <CustomInput 
                placeholder="Address" type="input" 
                value={uAddress.address1} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('address1', event.target.value) } 
            />                
            <CustomInput 
                placeholder="Apartment, Suit, Etc.(Optional)" 
                type="input" 
                value={uAddress.address2} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('address2', event.target.value) } 
                />    
            <CustomInput 
                placeholder="City" 
                type="input" 
                value={uAddress.city} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('city', event.target.value) } 
                /> 
            <CustomInput 
                placeholder="State/Province" 
                type="input" 
                value={uAddress.province} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('province', event.target.value) } 
                />  
			<div className="two-comlumns-responsive">
                <CustomCountrySelect 
                    value={uAddress.country}  
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('country', event.target.value)}
                />
                <CustomInput 
                    placeholder="Zip Code" 
                    type="input" 
                    value={uAddress.zip} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressPart('zip', event.target.value) } 
                />
			</div>
            {/* {
                !isCheckout && !isCheckoutPayment? <>    
                    <CustomButton buttonText="Update" submit={updateShippingInfo}></CustomButton>
                    <p className={alertClass}> {alertMessage} </p>
                </> : ''
            } */}
        </div>
    );
}

ShippingInfo.defaultProps = {
    isCheckout: false, 
    isCheckoutPayment: false,
    changeValue : Function    
}
export default ShippingInfo;