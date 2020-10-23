import React, { useState } from 'react';

import '../assets/styles/contact.scss';

export default () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [alertClass, setAlertClass] = useState("contact-alert-red");

    let sendEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAlertClass("contact-alert-red");
        if (name == "") { 
            setAlertMessage("Please input name field.");
            return;
        }
        if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) { 
            setAlertMessage("Please input correct email address.");
            return;
        }
        if (message ==""){ 
            setAlertMessage("Please input message field.");
            return;
        }       
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
                    setAlertClass("contact-alert-red");
                    setAlertMessage("There was an error to sent email.");
                }
            });
    };
    let setNameField = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setName(event.target.value);
    };
    let setEmailField = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(event.target.value);
    };
    let setMessageField = (event: { target: { value: React.SetStateAction<string>; }; }) => { 
        setMessage(event.target.value);
    };

    return (
        <div className="contact page">
            <h1 className="page-title">Contact Us</h1>
            <div className="contact-blurb section-custom-border">
                <div className="contact-form"> 
                    <div className="contact-info"> 
                        <div className="input-clip-path-outside">
                            <input placeholder="NAME" onChange={setNameField} value={name} className="input-clip-path-inside"></input>
                        </div>
                        <div className="input-clip-path-outside">
                            <input placeholder="EMAIL" onChange={setEmailField} value={email} className="input-clip-path-inside"></input>
                        </div>
                    </div>
                    <div className="contact-message">
                        <div className="input-clip-path-outside">
                            <textarea placeholder="MESSAGE" onChange={setMessageField} value={message} className="input-clip-path-inside"></textarea>
                        </div>
                    </div>   
                    <div className="contact-submit"> 
                        <div className="button-clip-path-outside">
                            <button className="button-clip-path-inside" onClick={sendEmail}> 
                                SUBMIT
                            </button>            
                        </div>                        
                    </div>     
                    <p className={alertClass}> 
                        {alertMessage}
                    </p>
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

