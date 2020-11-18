/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import './CardSectionStyles.scss'


const CardSection = () => {
    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: "#ffffff",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#ffffff",
                iconColor: "#ffffff",
            },
        },
    };

    return (
        <label>
            Card details
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
    );
};

export default CardSection;