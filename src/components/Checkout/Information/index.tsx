import React, { useContext, useEffect, useState } from 'react';
import gqlClient from 'utils/gqlClient';
import { Link } from '@reach/router';
import { CustomerContext } from 'state/Customer';
// import { CartContext } from 'state/Cart';
import { useMutation } from '@apollo/client';
import { SET_SHIPPING_ADDRESS } from 'utils/gqlMutation';
import { GET_CUSTOMER_ADDRESSES } from 'utils/gqlQuery';
import { CreateAddressInput } from 'types/vendure';


// import { Customer } from 'types/vendure';

import ShippingInfo from 'components/Profile/ShippingInfo';
import CustomInput from 'components/CustomInput';
import './Information.scss';

const CheckoutInformation = () => { 
	const {token, customer}  = useContext(CustomerContext);
	// const {cart} = useContext(CartContext);

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

    const onSubmit = async () => { 
		const input: CreateAddressInput = {
			streetLine1: uAddress.streetLine1,
			streetLine2: uAddress.streetLine2,
			city: uAddress.city,
			province: uAddress.province,
			postalCode: uAddress.postalCode,
			countryCode: uAddress.country.code
		};
		await setShipingAddress({
			fetchPolicy: 'no-cache',
			variables: { 
				input : input
			}
		});	
		window.location.href="/checkout/shipping";
	}

	const [setShipingAddress] = useMutation(SET_SHIPPING_ADDRESS, {
		onCompleted: async (data) => {
            if(data) {                
                console.log(data);   
            } 
		},
	});
	
	useEffect( () => { 
        getCustomerAddress();
	}, []); 

	let getCustomerAddress = async () => { 
        const {data: data } = await gqlClient.query({
            query: GET_CUSTOMER_ADDRESSES,
            fetchPolicy: 'no-cache'
        });
        if(data.activeCustomer.addresses[0]) { 
            setUAddress(data.activeCustomer.addresses[0]);
        }
    }
	
    return ( 
        <div className="checkoutInformation">
			<p className="title">
				CONTACT INFORMATION
			</p>
			{	
				!token ? <>
					<CustomInput placeholder="Email or mobile phone number" value="" onChange={() => {}}/>    
					<span>
						Already have an account? <Link to="/login">LOGIN</Link>
					</span>
				</> : 
				 	<CustomInput placeholder="Email or mobile phone number" value={customer.emailAddress} onChange={() => {}} enable={false}/>   
			}
			<p className="title">
				SHIPPING ADDRESS
			</p>
			<ShippingInfo isCheckout={true}/>
			<div className="information-submit">
				<Link to="/cart"> <span> {`<  Return to Cart`}</span></Link> 
				<div className="button-clip-path-outside">
					<button onClick={onSubmit} className="button-clip-path-inside"> 
						CONTINUE TO SHIPPING
					</button> 
				</div>
			</div>
        </div>
    )
}

export default CheckoutInformation;