import React, { useContext, useEffect, useState } from 'react';
import gqlClient from 'utils/gqlClient';
import { Link, navigate } from '@reach/router';
import { CustomerContext } from 'state/Customer';
import { CartContext } from 'state/Cart';
import { useMutation } from '@apollo/client';
import { SET_CHECKOUT_SHIPPING_ADDRESS } from 'utils/gqlMutation';
import { GET_CUSTOMER_ADDRESSES } from 'utils/gqlQuery';
import { MailingAddressInput } from 'shopify-storefront-api-typings';

// import { Customer } from 'types/vendure';

import ShippingInfo from 'components/Profile/ShippingInfo';
import CustomInput from 'components/CustomInput';
import './Information.scss';

const CheckoutInformation = () => { 
	const [addressInput, setAddressInput] = useState<MailingAddressInput | null>(null);
	const { token, customer }  = useContext(CustomerContext);
	const { cart } = useContext(CartContext);

	// const [uAddress, setUAddress] = useState({
    //     address1: '', 
	// 	address2: '',
    //     city: '',
	// 	company: '',
	// 	country: '',
	// 	firstName: '',
	// 	lastName: '',
	// 	phone: '',
    //     province: '',
	// 	zip: ''
    // });

    const onSubmit = async () => { 
		// const input: MailingAddressInput = {
		// 	address1: uAddress.address1,
		// 	address2: uAddress.address2,
		// 	city: uAddress.city,
		// 	company: uAddress.company,
		// 	country: uAddress.country,
		// 	firstName: uAddress.firstName,
		// 	lastName: uAddress.lastName,
		// 	phone: uAddress.phone,
		// 	province: uAddress.province,
		// 	zip: uAddress.zip
		// };

		try {
			await setShipingAddress({
				fetchPolicy: 'no-cache',
				variables: { 
					input: addressInput
				}
			});	

			navigate('/checkout/shipping');
		} catch (error) {
			console.log(error);
			alert('We could not your shipping address. Please refresh and try again, or contact us.');
		}
	}

	const [setShipingAddress] = useMutation(SET_CHECKOUT_SHIPPING_ADDRESS, {
		onCompleted: async (data) => {
            if(data) {                
                console.log(data);   
            } 
		},
	});
	
	// useEffect( () => { 
    //     getCustomerAddress();
	// }, []); 

	// let getCustomerAddress = async () => { 
    //     const {data: data } = await gqlClient.query({
    //         query: GET_CUSTOMER_ADDRESSES,
    //         fetchPolicy: 'no-cache'
    //     });
    //     if(data.activeCustomer.addresses[0]) { 
    //         setUAddress(data.activeCustomer.addresses[0]);
    //     }
    // }
	
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
				 	<CustomInput placeholder="Email or mobile phone number" value={customer.email} onChange={() => {}} enable={false}/>   
			}
			<p className="title">
				SHIPPING ADDRESS
			</p>
			<ShippingInfo isCheckout={true} changeValue={setAddressInput} />
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