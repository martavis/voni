import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';

import '../assets/styles/checkout.scss';

import Information from 'components/Profile/Information';
import Shipping from 'components/Profile/Shipping';
import Payment from 'components/Profile/Payment';

type DF = React.FC<{ path?: String }>;

const Profile: DF = () => {
    const [hasReachedInfo, setHasReachedInfo] = useState<boolean>(true);
    const [hasReachedShipping, setHasReachedShipping] = useState<boolean>(false);
    const [hasReachedPayment, setHasReachedPayment] = useState<boolean>(false);
    const { pathname } = typeof document !== 'undefined' && window.location;
    
    useEffect(() => {
        switch (pathname) {
            case '/profile/shipping':
                setHasReachedShipping(true);
                break;
            case '/profile/payment':
                setHasReachedPayment(true);
                setHasReachedShipping(true);
                break;                
            default:
                setHasReachedInfo(true);
                break;
        };
    }, [pathname]);

	return (
		<div className="profile-container page-container">
            <div className="forms profile-side">
                <header>
                    <Link to="/profile" data-enabled={hasReachedInfo}>Information</Link>
                    <Link to="/profile/shipping" data-enabled={hasReachedShipping}>Shipping</Link>
                    <Link to="/profile/payment" data-enabled={hasReachedPayment}>Payment</Link>
                </header>
                { hasReachedPayment ? <Payment></Payment> : ''}        
                { hasReachedShipping && !hasReachedPayment? <Shipping></Shipping> : ''}   
                { hasReachedInfo && !hasReachedShipping && !hasReachedPayment? <Information></Information> : ''}          
            </div>            
		</div>
	);
};

export default Profile;
