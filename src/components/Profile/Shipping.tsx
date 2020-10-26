import { Link } from '@reach/router';
import React, { useState } from 'react';

import './Profile.scss';
type DF = React.FC<{ path?: String }>;

const Shipping: DF = () => {
	let [shipMethod, setShipMethod] = useState(0);
	let contact = "example@example.com";
	let shipTo = "10th Street, Example area, City 7600, Pakistan";
	const onSubmit = () => { 
		window.location.href="/checkout/payment";
	}
	return (
		<div className="shipping-container page-container">
			<div className="input-clip-path-outside"> 
				<div className="input-clip-path-inside contact-info"> 
					<div>
						Contact: 
						<span>{contact}</span>
						<Link to="/checkout">CHANGE</Link>
					</div> 
					<div>
						Ship to: 
						<span>{shipTo}</span>
						<Link to="/checkout">CHANGE</Link>
					</div>					
				</div>
			</div>
			<p className="title">
				SHIPPING METHOD
			</p>
			<div className="input-clip-path-outside"> 
				<div className={"input-clip-path-inside shipping-info " + (shipMethod == 0 ? 'selected' : '')} onClick={() => setShipMethod(0)}> 
					Standard
					<span>Free</span>
				</div>
			</div>
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
			<div className="input-clip-path-outside"> 
				<div className={"input-clip-path-inside shipping-info " + (shipMethod == 2 ? 'selected' : '')}  onClick={() => setShipMethod(2)}> 
					<div>
						DHL Express Website
						<span>$50.73</span>
					</div>
					<div>
						3 to 4 business days
					</div>
				</div>
			</div>
			<div className="information-submit">
				<Link to="/checkout"> <span> {`<  Return to Information`}</span></Link> 
				<div className="button-clip-path-outside">
					<button onClick={onSubmit} className="button-clip-path-inside"> 
						CONTINUE TO PAYMENT
					</button> 
				</div>
			</div>
		</div>
	);
};

export default Shipping;
