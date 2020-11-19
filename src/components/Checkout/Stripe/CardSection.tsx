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
                fontSize: "16px",
                backgroud: '#ffffff',
                "::placeholder": {
                    color: "#ffffff",
                },
                iconColor: '#ffffff'
            },
            invalid: {
                color: "#ffffff",
                iconColor: "#ffffff",
            },
        },
    };

    return (
        <label>
            <div className="input-clip-path-outside">
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
        </label>
    );
};

export default CardSection;