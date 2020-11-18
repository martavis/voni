import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51HorzoJ0zTieAKEQQS0k0VRx7eD2St7PAB6EDnSX8mGhf11IYqYmxLEGKrx3Yf4cdBSQG1qRgLpYfRwHND7lUfNS00VNVfYIsT");

const StripeForm = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeForm;
