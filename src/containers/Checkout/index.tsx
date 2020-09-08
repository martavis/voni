import React from 'react';
// import React, { useContext } from 'react';
// import { Link } from '@reach/router';
// import { CartContext } from 'state/Cart';
// import { useMutation } from '@apollo/client';
// import { Order } from 'types/vendure';
// import { formatPrice } from 'utils/functions';

import '../../assets/styles/checkout.scss';

type DF = React.FC<{ path?: String }>;

const Checkout: DF = () => {
	// const { cart }: { cart: Order, setCart: Function } = useContext(CartContext);

	return (
		<div className="checkout-container page-container">
            <p>Checkout</p>
            <div className="forms"></div>
            <div className="summary">
                <div className="summary-line">
                    <div className="summary-line-title"></div>
                    <div className="summary-line-price"></div>
                </div>
            </div>
		</div>
	);
};

export default Checkout;
