import React, { useState } from 'react';

import '../assets/styles/account-related.scss';

import ProfileInfo from 'components/Profile/ProfileInfo';
import ShippingInfo from 'components/Profile/ShippingInfo';
import PrivacyInfo from 'components/Profile/PrivacyInfo';

type DF = React.FC<{ path?: String }>;

const Profile: DF = () => {
    const [viewMode, setViewMode] = useState(0);    
    
	return (
		<div className="profile-container page-container">
            <h1 className="page-title">Profile</h1>
            <div className="section-custom-border">
                <header>
                    <a onClick={() => {setViewMode(0)}}>Information</a>
                    <a onClick={() => {setViewMode(1)}}>Shipping</a>
                    <a onClick={() => {setViewMode(2)}}>Privacy</a>
                    <a onClick={() => {setViewMode(2)}}>Orders</a>
                </header>
                { viewMode == 2 ? <PrivacyInfo /> : ''}        
                { viewMode == 1 ? <ShippingInfo /> : ''}   
                { viewMode == 0 ? <ProfileInfo /> : ''}          
            </div>            
		</div>
	);
};

export default Profile;
