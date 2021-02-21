import React, { useState } from 'react';
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
                sendToEmail: 'info.voni@gmail.com', 
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
                    addToast('There was an error sending your email. Please try again or contact us directly at info.voni@gmail.com.', { appearance: 'error' });
                }
            });
    };

    return (
        <div className="contact page">
            <h1 className="page-title">Contact Us</h1>
            <div className="contact-blurb section-custom-border">
                <div className="contact-form"> 
                    <div className="contact-info"> 
                        <CustomInput placeholder="NAME" type="input" value="" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); }} />
                        <CustomInput placeholder="EMAIL" type="input" value="" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }} />
                    </div>
                    <CustomInput placeholder="MESSAGE"  value="" type="textarea" onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => {setMessage(event.target.value);}} />
                    <CustomButton buttonText="SUBMIT" submit={sendEmail} isDisabled={isSending} />                    
                </div>
                <div className="contact-information"> 
                    <div>
                        <div>
                            <p className="info-title">ADDRESS</p>
                            <p className="info-description">7563 St.Vicent Place, Glasgow</p>
                        </div>
                        <div>
                            <p className="info-title">PHONE</p>
                            <p className="info-description">+09123 456 789</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className="info-title">HOURS</p>
                            <p className="info-description">7 Days a week from 10:00 am to 6pmt</p>
                        </div>
                        <div>
                            <p className="info-title">EMAIL</p>
                            <p className="info-description">zemes@demolink.org</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

