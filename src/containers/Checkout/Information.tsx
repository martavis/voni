import { Link } from '@reach/router';
import React from 'react';

type DF = React.FC<{ path?: String }>;

const Information: DF = () => {
	let information = { 
		contact: '',
		address: '', 
		fname: '', 
		lname: '',
	}
	const onSubmit = () => { 
		window.location.href="/checkout/shipping";
	}
	return (
		<div className="information-container page-container">
			<p className="title">
				CONTACT INFORMATION
			</p>
			<div className="input-clip-path-outside">
				<input placeholder="Email or mobile phone number" value={information.contact} className="input-clip-path-inside"></input>
			</div>
			<span>
				Already have an account? <Link to="/login">LOGIN</Link>
			</span>
			<p className="title">
				SHIPPING ADDRESS
			</p>
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
			<div className="information-submit">
				<Link to="/cart"> <span> {`<  Return to Cart`}</span></Link> 
				<div className="button-clip-path-outside">
					<button onClick={onSubmit} className="button-clip-path-inside"> 
						CONTINUE TO SHIPPING
					</button> 
				</div>
			</div>
		</div>
	);
};

export default Information;
