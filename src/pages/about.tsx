import React, { useState } from 'react';
import { Head } from 'react-static';
import { Link } from '@reach/router';
import { useQuery } from '@apollo/client';
import { GET_PAGE } from 'utils/gqlQuery';

import '../assets/styles/about.scss';

export default () => {
	const [about, setAbout] = useState<any>(null);

	useQuery<Record<string, any>>(GET_PAGE, {
		fetchPolicy: 'no-cache',
		variables: {
			handle: 'about-us',
		},
		onError: (error) => {
			console.log(error);
		},
		onCompleted: ({ page }) => {
			setAbout(page);
		},
	});

	return (
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
			{about && <div className="section-custom-border" dangerouslySetInnerHTML={{ __html: about.body }}></div>}
			<div className="need-help">
				<Link to="/contact">Need help? Click to send us an email.</Link>
			</div>
		</div>
	);
};
