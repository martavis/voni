import { Link } from '@reach/router';
import React, { useState, useContext, useEffect } from 'react';
import { CustomerContext } from 'state/Customer';
import { GET_CUSTOMER_ADDRESSES } from 'utils/gqlQuery';
import gqlClient from 'utils/gqlClient';
// import { AddressContext } from 'state/Address';

import './Shipping.scss';

const CheckoutShipping = () => {
	let [shipMethod, setShipMethod] = useState(1);
	const { customer }  = useContext(CustomerContext);
	// const { shippingAddress }  = useContext(AddressContext);
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
	const onSubmit = () => { 
		window.location.href="/checkout/payment";
	}

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
        } else { 
            
        }
    }

	return (
		<div className="checkoutShipping">
			<p className="title">
				CONTACT INFORMATION
			</p>
			<div className="input-clip-path-outside"> 
				<div className="input-clip-path-inside contact-info"> 
					<div>
						Contact: 
						<span>{customer.emailAddress}</span>
						<Link to="/checkout">CHANGE</Link>
					</div> 
					<div>
						Ship to: 
						<span>{uAddress.streetLine1 + ', ' + uAddress. streetLine2 + ', ' +  uAddress.city
								+ ' ' + uAddress.province + ', ' + uAddress.postalCode + ', ' + uAddress.country.name}</span>
						<Link to="/checkout">CHANGE</Link>
					</div>					
				</div>
			</div>
			<p className="title">
				SHIPPING METHOD
			</p>
			{/* <div className="input-clip-path-outside"> 
				<div className={"input-clip-path-inside shipping-info " + (shipMethod == 0 ? 'selected' : '')} onClick={() => setShipMethod(0)}> 
					Standard
					<span>Free</span>
				</div>
			</div> */}
			<div className="input-clip-path-outside"> 
				<div className={"input-clip-path-inside shipping-info " + (shipMethod == 1 ? 'selected' : '')}  onClick={() => setShipMethod(1)}> 
					<div>
						USPS First Class Package International
						<span>$13.73</span>
					</div>
					<div>
						7 to 21 business days
					</div>
				</div>
			</div>
			{/* <div className="input-clip-path-outside"> 
				<div className={"input-clip-path-inside shipping-info " + (shipMethod == 2 ? 'selected' : '')}  onClick={() => setShipMethod(2)}> 
					<div>
						DHL Express Website
						<span>$50.73</span>
					</div>
					<div>
						3 to 4 business days
					</div>
				</div>
			</div> */}
			{  					
				<div className="information-submit">
					<Link to="/checkout"> <span> {`<  Return to Information`}</span></Link> 
					<div className="button-clip-path-outside">
						<button onClick={onSubmit} className="button-clip-path-inside"> 
							CONTINUE TO PAYMENT
						</button> 
					</div>
				</div>
			}
		</div>
	);
};

export default CheckoutShipping;
