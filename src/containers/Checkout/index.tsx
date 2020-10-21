import React, { useState, useContext, useEffect } from 'react';
import { Link } from '@reach/router';
import { CartContext } from 'state/Cart';
// import { useMutation } from '@apollo/client';
import { Order } from 'types/vendure';
import { formatPrice } from 'utils/functions';

import '../../assets/styles/checkout.scss';

type DF = React.FC<{ path?: String }>;

const Checkout: DF = () => {
    const [hasReachedInfo, setHasReachedInfo] = useState<boolean>(false);
    const [hasReachedShipping, setHasReachedShipping] = useState<boolean>(false);
    const [hasReachedPayment, setHasReachedPayment] = useState<boolean>(false);
    const { pathname } = typeof document !== 'undefined' && window.location;
    const { cart }: { cart: Order, setCart: Function } = useContext(CartContext);

    useEffect(() => {
        switch (pathname) {
            case '/checkout/shipping':
                setHasReachedShipping(true);
                break;
            case '/checkout/payment':
                setHasReachedPayment(true);
                break;
            default:
                setHasReachedInfo(true);
                break;
        };
    }, [pathname]);

	return (
		<div className="checkout-container page-container">
            <div className="forms checkout-side">
                <header>
                    <Link to="/cart" data-enabled={true}>Cart</Link>
                    <Link to="/checkout" data-enabled={hasReachedInfo}>Information</Link>
                    <Link to="/checkout/shipping" data-enabled={hasReachedShipping}>Shipping</Link>
                    <Link to="/checkout/payment" data-enabled={hasReachedPayment}>Payment</Link>
                </header>
            </div>
            <div className="summary checkout-side">
                <div className="summary-lines summary-section">{
                    cart.lines.map((line, i) => (
                        <div key={i}>
                            <p className="summary-line-title">({line.quantity})&nbsp;&nbsp;{line.productVariant.name}</p>
                            <p className="summary-line-price">${formatPrice(line.totalPrice)} USD</p>
                        </div>
                    ))
                }</div>
                {/* <div className="promo-code summary-section">
                    Promos coming soon
                </div> */}
                <div className="price-structure summary-section">
                    <div>
                        <p className="title">Subtotal</p>
                        <p className="value">${formatPrice(cart.subTotal)} USD</p>
                    </div>
                    <div>
                        <p className="title">Shipping</p>
                        <p className="value">Calculated at next step</p>
                    </div>
                </div>
                <div className="total summary-section">
                    <div>
                        <p className="title">Total</p>
                        <p className="value">${formatPrice(cart.total)} USD</p>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default Checkout;
