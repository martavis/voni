import React from 'react';
import { GET_CUSTOMER_ADDRESSES } from 'utils/gqlQuery';
import { CustomerContext } from 'state/Customer';
import gqlClient from 'utils/gqlClient';
import { Link } from '@reach/router';

import ShippingInfo from 'components/Account/ShippingInfo'
import './Payment.scss';

const CheckoutPayment = () => {	
    // TODO: add payment form with Stripe
    return (
        <div>Payment Form</div>
    );
};

export default CheckoutPayment;
