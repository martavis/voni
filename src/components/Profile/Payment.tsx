import React, { useState } from 'react';
import { Link } from '@reach/router';

import './Profile.scss';
type DF = React.FC<{ path?: String }>;

const Payment: DF = () => {
	let contact = "example@example.com";
    let shipTo = "10th Street, Example area, City 7600, Pakistan";
    let ShipMethod = "Standard - Free";
    let [billMethod, setBillMethod] = useState(0);
	const onSubmit = () => { 
		window.location.href="/checkout/payment";
	}
    return (
        <div className="payment-container page-container">
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
                    <div>
						Method: 
						<span>{ShipMethod}</span>
						<Link to="/checkout">CHANGE</Link>
					</div>				
				</div>
			</div>
            <p className="title">
				PAYMENT
			</p>
            <span>
                All transactions are secure and encrypted.
            </span> 
            <div className="input-clip-path-outside">
				<input placeholder="Card number" className="input-clip-path-inside"></input>
			</div>
            <div className="input-clip-path-outside">
				<input placeholder="Name on card" className="input-clip-path-inside"></input>
			</div>
            <div className="two-comlumns-responsive">
				<div className="input-clip-path-outside">
					<input placeholder="Expiration Date (MM/YY)" className="input-clip-path-inside"></input>
				</div>
				<div className="input-clip-path-outside">
					<input placeholder="Security" className="input-clip-path-inside"></input>
				</div>
			</div>
            <p className="title">
				BILLING ADDRESS
			</p>
            <span>
                Select the address that matches your card or payment method.
            </span> 
            <div className="input-clip-path-outside"> 
				<div className={"input-clip-path-inside shipping-info " + (billMethod == 0 ? 'selected' : '')} onClick={() => setBillMethod(0)}> 
					Same as shipping address					
				</div>
			</div>
            <div className="input-clip-path-outside"> 
				<div className={"input-clip-path-inside shipping-info " + (billMethod == 1 ? 'selected' : '')} onClick={() => setBillMethod(1)}> 
					Use a different billing address
				</div>
			</div>
            { billMethod == 1 ? <>
                <div className="two-comlumns-responsive">
                    <div className="input-clip-path-outside">
                        <input placeholder="First Name(Optional)" name="firstName" className="input-clip-path-inside"></input>
                    </div>
                    <div className="input-clip-path-outside">
                        <input placeholder="Last Name(Optional)" name="lastName" className="input-clip-path-inside"></input>
                    </div>
                </div>
                <div className="input-clip-path-outside">
                    <input placeholder="Address" name="address1" className="input-clip-path-inside"></input>
                </div>
                <div className="input-clip-path-outside">
                    <input placeholder="Apartment, Suit, Etc.(Optional)" name="address2" className="input-clip-path-inside"></input>
                </div>
                <div className="input-clip-path-outside">
                    <input placeholder="City" name="city" className="input-clip-path-inside"></input>
                </div>
                <div className="two-comlumns-responsive">
                    <div className="input-clip-path-outside">
                        <input placeholder="First Name(Optional)" name="country" className="input-clip-path-inside"></input>
                    </div>
                    <div className="input-clip-path-outside">
                        <input placeholder="Post Code" name="postcode" className="input-clip-path-inside"></input>
                    </div>
                </div> 
                </>
                : ''
            }
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

export default Payment;
