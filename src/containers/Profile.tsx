import React, { useState } from 'react';

import '../assets/styles/account-related.scss';

import Information from 'components/Profile/Information';
import Shipping from 'components/Profile/Shipping';
import Payment from 'components/Profile/Payment';

type DF = React.FC<{ path?: String }>;

const Profile: DF = () => {
    const [viewMode, setViewMode] = useState(0);    
    
	return (
		<div className="profile-container page-container">
            <h1 className="page-title">Profile</h1>
            <div className="forms profile-side section-custom-border">
                <header>
                    <a onClick={() => {setViewMode(0)}}>Information</a>
                    <a onClick={() => {setViewMode(1)}}>Shipping</a>
                    <a onClick={() => {setViewMode(2)}}>Payment</a>
                </header>
                { viewMode == 2 ? <Payment isCheckout={false}></Payment> : ''}        
                { viewMode == 1 ? <Shipping isCheckout={false}></Shipping> : ''}   
                { viewMode == 0 ? <Information isCheckout={false}></Information> : ''}          
            </div>            
		</div>
	);
};

export default Profile;
