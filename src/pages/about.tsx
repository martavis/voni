import React from 'react';
import { Head } from 'react-static';
import { Link } from '@reach/router';

import '../assets/styles/about.scss';

export default () => (
    <div className="about page">
		<Head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>About | Voni Aesthetics</title>
			<meta name="description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
			<meta name="keywords" content="Voni, Aesthetics, clothing, apparel, fashion, accessories"></meta>
			<meta property="og:title" content="About | Voni Aesthetics" />
			<meta property="og:description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://voni.us/about" />
			<meta property="og:image" content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png" />
			<meta property="og:image:secure_url" content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png" />
			<meta property="og:image:type" content="image/png" />
			<meta property="og:image:width" content="1366" />
			<meta property="og:image:height" content="768" />
			<meta property="og:image:alt" content="Voni Aesthetics" />
			<link rel="apple-touch-icon" sizes="180x180" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-16x16.png" />
			<link rel="manifest" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/site.webmanifest" />
			<link rel="mask-icon" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/safari-pinned-tab.svg" color="#3a551a" />
			<meta name="msapplication-TileColor" content="#00a300" />
			<meta name="theme-color" content="#ffffff"></meta>
		</Head>
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
			<p>
				Here at Voni Aesthetics we strive for every girl to feel, love and be the absolute best version of themselves. Your future begins here, and it all starts with YOU.
			</p>
			<p>
				Let go of all the expectations.
			</p>
			<p>
				Let go of all the judgement.
			</p>
			<p>
				Let go, and be YOU.
			</p>
		</div>
		<div className="need-help">
			<Link to="/contact">Need help? Click to send us an email.</Link>
		</div>
    </div>
);
