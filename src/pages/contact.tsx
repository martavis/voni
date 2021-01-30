import React, { useState } from 'react';
import { validateEmail } from 'utils/functions';
import CustomInput from 'components/CustomInput';
import CustomButton from 'components/CustomButton';

import '../assets/styles/contact.scss';

export default () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [alertClass, setAlertClass] = useState("alert-red");

    let sendEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAlertClass("alert-red");
        if (name == "") { 
            setAlertMessage("Please input name field.");
            return;
        }
        if (!validateEmail(email)) { 
            setAlertMessage("Please add a valid email address address.");
            return;
        }
        if (message ==""){ 
            setAlertMessage("Please input message field.");
            return;
        }       
        setAlertMessage('sending now..');
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body : JSON.stringify( {
                sendToEmail: "info.voni@gmail.com", 
                userEmail: email, //email input
                userName: name, //name input
                userMessage: message //message input
            } )
        };
        fetch('https://us-central1-portfolio-2020-268818.cloudfunctions.net/sendEmailToInfo', requestOptions)            
            .then(response => {
                if(response.ok == true) { 
                    setAlertClass("contact-alert-green");
                    setAlertMessage("Email sent successfully.");
                } else { 
                    setAlertClass("alert-red");
                    setAlertMessage("There was an error to sent email.");
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
                    <CustomButton buttonText="SUBMIT" submit={sendEmail} />                    
                    <p className={alertClass}> {alertMessage} </p>
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

