import React, { useContext, useEffect, useState } from 'react';
import gqlClient from 'utils/gqlClient';
import { Link, navigate } from '@reach/router';
import { CustomerContext } from 'state/Customer';
import { CartContext } from 'state/Cart';
import { useMutation } from '@apollo/client';
import { SET_CHECKOUT_SHIPPING_ADDRESS, SET_CHECKOUT_EMAIL } from 'utils/gqlMutation';
import { GET_CUSTOMER_ADDRESSES } from 'utils/gqlQuery';
import { MailingAddressInput } from 'shopify-storefront-api-typings';
import { saveNewCart } from 'utils/functions';

import ShippingInfo from 'components/Profile/ShippingInfo';
import CustomInput from 'components/CustomInput';
import './Information.scss';

const CheckoutInformation = () => { 
	const [email, setEmail] = useState<string>('');
	const [addressInput, setAddressInput] = useState<MailingAddressInput | null>(null);
	const { token, customer } = useContext(CustomerContext);
	const { cart, setCart } = useContext(CartContext);
	const requiredAddressKeys = ['address1', 'city', 'country', 'firstName', 'lastName', 'province', 'zip'];

    const onSubmit = async () => { 
		const areRequiredsFilled = requiredAddressKeys.every((key) => addressInput[key] !== '');
		
		if (email === '' || !areRequiredsFilled) {
			alert('Please fill out the entire form.');
			return;
		}

		try {
			await setCustomerEmail({
				fetchPolicy: 'no-cache',
				variables: { 
					checkoutId: cart.id,
					email
				}
			});	
			
			await setShippingAddress({
				fetchPolicy: 'no-cache',
				variables: { 
					checkoutId: cart.id,
					shippingAddress: addressInput
				}
			});	

			navigate('/checkout/shipping');
		} catch (error) {
			console.log(error);
			alert('We could not your shipping address. Please refresh and try again, or contact us.');
		}
	}

	const [setShippingAddress] = useMutation(SET_CHECKOUT_SHIPPING_ADDRESS, {
		onCompleted: ({ cart: { checkout } }) => saveNewCart(checkout, setCart)
	});

	const [setCustomerEmail] = useMutation(SET_CHECKOUT_EMAIL, {
		onCompleted: ({ cart: { checkout } }) => saveNewCart(checkout, setCart)
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
					<CustomInput 
						placeholder="Email address" 
						value={email} 
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>    
					<span>
						Already have an account? <Link to="/login">LOGIN</Link>
					</span>
				</> : 
				 	<CustomInput placeholder="Email address" value={customer.email} onChange={() => {}} enable={false} />   
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