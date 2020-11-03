import React, {useContext} from 'react';
import { Link } from '@reach/router';
import { CustomerContext } from 'state/Customer';
// import { Customer } from 'types/vendure';

import ShippingInfo from 'components/Profile/ShippingInfo'
import './Information.scss';
import CustomInput from 'components/CustomInput';

const CheckoutInformation = () => { 
    const {token, customer}  = useContext(CustomerContext);
    const onSubmit = () => { 
		window.location.href="/checkout/shipping";
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