import React, { useState } from 'react';

import '../assets/styles/account.scss';

import AccountInfo from 'components/Account/AccountInfo';
import ShippingInfo from 'components/Account/ShippingInfo';
import PrivacyInfo from 'components/Account/PrivacyInfo';
import Orders from 'components/Account/Orders';

type DF = React.FC<{ path?: String }>;

const Account: DF = () => {
    const [viewMode, setViewMode] = useState(0);
    
	return (
		<div className="account-container page-form">
            <h1 className="page-title">Account</h1>
            <div className="section-custom-border">
                <header>
                    <a onClick={() => {setViewMode(0)}} data-is-active={viewMode === 0}>Information</a>
                    <a onClick={() => {setViewMode(1)}} data-is-active={viewMode === 1}>Shipping</a>
                    <a onClick={() => {setViewMode(2)}} data-is-active={viewMode === 2}>Privacy</a>
                    <a onClick={() => {setViewMode(3)}} data-is-active={viewMode === 3}>Orders</a>
                </header>
                { viewMode == 3 ? <Orders /> : ''}        
                { viewMode == 2 ? <PrivacyInfo /> : ''}        
                { viewMode == 1 ? <ShippingInfo /> : ''}   
                { viewMode == 0 ? <AccountInfo /> : ''}          
            </div>            
		</div>
	);
};

export default Account;
