import React from 'react';

import '../assets/styles/contact.scss';

export default () => {
    return (
        <div className="contact page">
            <h1 className="page-title">Contact Us</h1>
            <div className="contact-blurb section-custom-border">
                <div className="contact-form"> 
                    <div className="contact-info"> 
                        <input className="button-clip-path" placeholder="NAME"></input>
                        <input className="button-clip-path" placeholder="EMAIL"></input>
                    </div>
                    <div className="contact-message">
                        <textarea placeholder="MESSAGE"></textarea>
                    </div>   
                    <div className="contact-submit"> 
                        <button className="button-clip-path"> 
                            SUBMIT
                        </button>            
                    </div>     
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

