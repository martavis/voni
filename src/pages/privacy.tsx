import React, { useState } from 'react';
import { Head } from 'react-static';
import { useQuery } from '@apollo/client';
import { GET_PAGE } from 'utils/gqlQuery';

import '../assets/styles/privacy.scss';

export default () => {
    const [privacy, setPrivacy] = useState<any>(null);

	useQuery<Record<string, any>>(GET_PAGE, {
		fetchPolicy: 'no-cache',
		variables: {
			handle: 'privacy-policy-1',
		},
		onError: (error) => {
			console.log(error);
		},
		onCompleted: ({ page }) => {
			setPrivacy(page);
		},
	});
    
    return (
        <div className="privacy page">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Privacy | Voni Aesthetics</title>
                <meta name="description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
                <meta name="keywords" content="Voni, Aesthetics, clothing, apparel, fashion, accessories"></meta>
                <meta property="og:title" content="Privacy | Voni Aesthetics" />
                <meta property="og:description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://voni.us/privacy" />
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
            <h1 className="page-title">Privacy Policy</h1>
            {privacy && <div className="section-custom-border" dangerouslySetInnerHTML={{ __html: privacy.body }}></div>}
        </div>
    );
};