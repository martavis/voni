import React, { useState } from 'react';
import { Head } from 'react-static';
import { useToasts } from 'react-toast-notifications';
import { validateEmail } from 'utils/functions';

import '../assets/styles/contact.scss';

import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

export default () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { addToast } = useToasts();

    let sendEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (name === '') { 
            addToast('Please input your name.', { appearance: 'error' });
            return;
        }
        if (!validateEmail(email)) { 
            addToast('Please add a valid email address address.', { appearance: 'error' });
            return;
        }
        if (message === ''){ 
            addToast('Please add a message.', { appearance: 'error' });
            return;
        }       
        
        setIsSending(true);

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                sendToEmail: 'contact@voni.us', 
                userEmail: email,
                userName: name,
                userMessage: message
            })
        };
        fetch('https://us-central1-portfolio-2020-268818.cloudfunctions.net/sendEmailToInfo', requestOptions)            
            .then(response => {
                if(response.ok == true) { 
                    addToast('Email sent successfully.', { appearance: 'success' });
                } else { 
                    addToast('There was an error sending your email. Please try again or contact us directly at contact@voni.us.', { appearance: 'error' });
                }
            });
    };

    return (
		<div className="contact page">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Contact | Voni Aesthetics</title>
				<meta
					name="description"
					content="The apparel line of the future is here. Astro Collection available now for purchase."
				/>
				<meta name="keywords" content="Voni, Aesthetics, clothing, apparel, fashion, accessories"></meta>
				<meta property="og:title" content="Contact | Voni Aesthetics" />
				<meta
					property="og:description"
					content="The apparel line of the future is here. Astro Collection available now for purchase."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://voni.us/contact" />
				<meta
					property="og:image"
					content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png"
				/>
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="1366" />
				<meta property="og:image:height" content="768" />
				<meta property="og:image:alt" content="Voni Aesthetics" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-16x16.png"
				/>
				<link
					rel="manifest"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/site.webmanifest"
				/>
				<link
					rel="mask-icon"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/safari-pinned-tab.svg"
					color="#3a551a"
				/>
				<meta name="msapplication-TileColor" content="#00a300" />
				<meta name="theme-color" content="#ffffff"></meta>
			</Head>
			<h1 className="page-title">Contact Us</h1>
			<div className="contact-blurb section-custom-border">
				<div className="contact-form">
					<div className="contact-info">
						<CustomInput
							placeholder="NAME"
							type="input"
							value=""
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setName(event.target.value);
							}}
						/>
						<CustomInput
							placeholder="EMAIL"
							type="input"
							value=""
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setEmail(event.target.value);
							}}
						/>
					</div>
					<CustomInput
						placeholder="MESSAGE"
						value=""
						type="textarea"
						onChange={(event: { target: { value: React.SetStateAction<string> } }) => {
							setMessage(event.target.value);
						}}
					/>
					<CustomButton buttonText="SUBMIT" submit={sendEmail} isDisabled={isSending} />
				</div>
				<div className="contact-information">
					<div>
						<p className="info-title">HOURS</p>
						<p className="info-description">Mon - Sun, 9 am to 9 pm</p>
					</div>
					<div>
						<p className="info-title">EMAIL</p>
						<p className="info-description">
							<a href="mailto:contact@voni.us">contact@voni.us</a>
						</p>
					</div>
					<div>
						<p className="info-title">Social</p>
						<p className="info-description">
							<a
								href="https://www.instagram.com/voniaesthetics/"
								target="_blank"
								rel="noreferrer noopener">
								Instagram
							</a>
							<a href="https://twitter.com/VoniAesthetics" target="_blank" rel="noreferrer noopener">
								Twitter
							</a>
							<a href="https://www.facebook.com/voniaesthetics" target="_blank" rel="noreferrer noopener">
								Facebook
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

