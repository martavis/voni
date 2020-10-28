import React, { useState } from 'react';

import '../assets/styles/account-related.scss';

export default () => {
    const [alertMessage, setAlertMessage] = useState("spam alert");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [alertClass, setAlertClass] = useState("contact-alert-red");

    let register = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAlertClass("contact-alert-red");
       
        if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) { 
            setAlertMessage("Please input correct email address.");
            return;
        }
        if (password == "") { 
            setAlertMessage("Please input assword field.");
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
    let setPasswordField = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setPassword(event.target.value);
    };
    let setEmailField = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(event.target.value);
    };

    return (
        <div className="profile page">
            <h1 className="page-title">Register</h1>
            <div className="section-custom-border">
                <div className="profile-info"> 
                    <div className="input-clip-path-outside">
                        <input placeholder="Email" onChange={setEmailField} className="input-clip-path-inside"></input>
                    </div>
                    <div className="input-clip-path-outside">
                        <input placeholder="Password" onChange={setPasswordField} className="input-clip-path-inside"></input>
                    </div>
                    <div className="input-clip-path-outside">
                        <input placeholder="Confirm Password" onChange={setPasswordField} className="input-clip-path-inside"></input>
                    </div>
                    <div>
                        <p className={alertClass}> 
                            {alertMessage}
                        </p>
                        <div className="button-clip-path-outside">
                            <button className="button-clip-path-inside" onClick={register}> 
                                SUBMIT
                            </button>            
                        </div> 
                    </div>                    
                </div>      
            </div>
        </div>
    )
};

