import React, { useState, useContext, useEffect } from 'react';
import { Link } from '@reach/router';
import { CartContext } from 'state/Cart';
// import { useMutation } from '@apollo/client';
import { Checkout, CheckoutLineItemEdge } from 'shopify-storefront-api-typings';
import { formatPrice } from 'utils/functions';

import '../assets/styles/checkout.scss';

import CheckoutInformation from 'components/Checkout/Information';
import CheckoutShipping from 'components/Checkout/Shipping';
import Payment from 'components/Checkout/Payment';
import ProductImage from 'components/ProductImage';

type DF = React.FC<{ path?: String }>;

const CheckoutContainer: DF = () => {
    const [hasReachedInfo, setHasReachedInfo] = useState<boolean>(true);
    const [hasReachedShipping, setHasReachedShipping] = useState<boolean>(false);
    const [hasReachedPayment, setHasReachedPayment] = useState<boolean>(false);
    const { pathname } = typeof document !== 'undefined' && window.location;
    const { cart }: { cart: Checkout, setCart: Function } = useContext(CartContext);
    
    useEffect(() => {
        switch (pathname) {
            case '/checkout/shipping':
                setHasReachedShipping(true);
                break;
            case '/checkout/payment':
                setHasReachedPayment(true);
                setHasReachedShipping(true);
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
                { hasReachedPayment ? <Payment/> : ''}        
                { hasReachedShipping && !hasReachedPayment? <CheckoutShipping/> : ''}   
                { hasReachedInfo && !hasReachedShipping && !hasReachedPayment? <CheckoutInformation/> : ''}          
            </div>
            <div className="summary checkout-side">
                <div className="summary-lines summary-section">{
                    cart.lineItems.edges.map(({ node }: CheckoutLineItemEdge, i: number) => {
                        const title = node.variant.title === 'Default Title' ? node.title : node.variant.title;
                        
                        return (
                            <div key={i}>
                                <div className="summary-left-line">      
                                    <ProductImage src={node.variant.image.originalSrc} isSmall />     
                                    <div>
                                        <p>{title}</p>
                                        <p>QTY: &nbsp;{node.quantity}</p>                                
                                    </div>
                                </div>
                                <div>
                                    <p className="summary-line-price">${formatPrice(node.variant.priceV2.amount)} USD</p>                                
                                </div>
                            </div>
                        )
                    })
                }</div>
                <div className="promo-code summary-section">
                    <div className="input-clip-path-outside">
                        <input placeholder="Discount Code" className="input-clip-path-inside"></input>
                        <div className="input-clip-path-outside apply-button">
                            <button className="input-clip-path-inside">Apply</button>
                        </div>
                    </div>
                </div>
                <div className="price-structure summary-section">
                    <div>
                        <p className="title">Subtotal</p>
                        <p className="value">${formatPrice(cart.subtotalPriceV2.amount)} USD</p>
                    </div>
                    <div>
                        <p className="title">Shipping</p>
                        <p className="value">{cart.shippingLine ? `$${formatPrice(cart.shippingLine.priceV2.amount)}` : 'Calculated at next step'}</p>
                    </div>
                    <div>
                        <p className="title">Taxes</p>
                        <p className="value">{cart.shippingAddress ? `$${formatPrice(cart.totalTaxV2.amount)}` : 'Calculated at next step'}</p>
                    </div>
                </div>
                <div className="total summary-section">
                    <div>
                        <p className="title">Total</p>
                        <p className="value">${formatPrice(cart.totalPriceV2.amount)} USD</p>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default CheckoutContainer;
