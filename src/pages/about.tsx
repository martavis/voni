import React from 'react';
import { Link } from '@reach/router';

import '../assets/styles/about.scss';

export default () => (
    <div className="about page">
      	<h1 className="page-title">About Us</h1>
		<div className="about-blurb section-custom-border">
			<h2>
				Catering to your requirements, handling your needs with care
			</h2>
			<p>
				Our store is more than just another average online retailer. We sell not only top quality 
				products, but give our customers a positive online shopping experience. Forget about struggling 
				to do everything at once: taking care of the family, running your business, walking your dog, 
				cleaning the house, doing the shopping, etc. Purchase the goods you need every day or just like in a 
				few clicks or taps, depending on the device you use to access the Internet. We work to make your life more enjoyable.
			</p>
		</div>
		<div className="need-help">
			<Link to="/contact">Need help? Click to send us an email.</Link>
		</div>
    </div>
);
