import { Link, navigate } from '@reach/router';
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from 'state/Cart';
import { GET_CHECKOUT } from 'utils/gqlQuery';
import gqlClient from 'utils/gqlClient';
import { useMutation } from '@apollo/client';
import { SET_SHIPPING_METHOD } from 'utils/gqlMutation';
import { formatPrice, saveNewCart } from 'utils/functions';

import './Shipping.scss';

const CheckoutShipping = () => {
	const [shipMethod, setShipMethod] = useState(null);
	const [areRatesReady, setAreRatesReady] = useState(false);
	const { cart, setCart } = useContext(CartContext);

	const onSubmit = async () => { 
		await setShippingMethod({
			fetchPolicy: 'no-cache',
			variables: { 
				checkoutId: cart.id,
				shippingRateHandle: cart.availableShippingRates.shippingRates[shipMethod].handle
			}
		});	

		navigate('/checkout/payment');		
	}

	const [setShippingMethod] = useMutation(SET_SHIPPING_METHOD, {
		onCompleted: ({ cart: { checkout } }) => saveNewCart(checkout, setCart)
	});

	const getCheckout = async () => {
        const { data: { node } } = await gqlClient.query({
            query: GET_CHECKOUT,
			fetchPolicy: 'no-cache',
			variables: { checkoutId: cart.id }
		});
		
		return node;
    };

	useEffect(() => { 
		// poll for the shipping rates because it takes a little time
		// suggested by Shopify https://shopify.dev/docs/storefront-api/reference/checkouts/availableshippingrates
		const timer = setInterval(async () => {
			if (!areRatesReady) {
				const cart = await getCheckout();

				if (cart && cart.availableShippingRates.ready) {                
					setCart(cart);
					setAreRatesReady(true);
				} 
				clearInterval(timer);
			}
		}, 1500);
	}, []); 
	
	useEffect(() => {
		if (areRatesReady) {
			setShipMethod(0); // set a default
		}
	}, [areRatesReady]);

	const { 
		email, 
		availableShippingRates: {
			shippingRates
		},
		shippingAddress: {
			address1,
			address2,
			city,
			province,
			country,
			firstName,
			lastName,
			zip
		} 
	} = cart;

	return (
		<div className="checkoutShipping">
			<p className="title">
				CONTACT INFORMATION
			</p>
			<div className="input-clip-path-outside"> 
				<div className="input-clip-path-inside contact-info"> 
					<div>
						Contact: 
						<span>{email}</span>
						<Link to="/checkout">CHANGE</Link>
					</div> 
					<div>
						Ship to: <br /><br />
						{firstName} {lastName}<br />
						{address1}<br />
						{address2 === '' ? '' : <>{address2}<br /></>}
						{city}, {province}<br />
						{country} {zip}
						<Link to="/checkout">CHANGE</Link>
					</div>					
				</div>
			</div>
			<p className="title">
				SHIPPING METHOD
			</p>
			{
				areRatesReady &&
				shippingRates.map(({ priceV2, title }, i) => (
					<div key={i} className="input-clip-path-outside"> 
						<div className={`input-clip-path-inside shipping-info ${(shipMethod == i ? 'selected' : '')}`} onClick={() => setShipMethod(i)}> 
							<div>
								{title}
								<span>${formatPrice(priceV2.amount)}</span>
							</div>
							<div></div>
						</div>
					</div>
				))
			}
			<br /><br />
			<div className="information-submit">
				<Link to="/checkout"> <span> {`<  Return to Information`}</span></Link> 
				<div className="button-clip-path-outside">
					<button onClick={onSubmit} className="button-clip-path-inside" disabled={!areRatesReady || shipMethod === null}> 
						CONTINUE TO PAYMENT
					</button> 
				</div>
			</div>
		</div>
	);
};

export default CheckoutShipping;
