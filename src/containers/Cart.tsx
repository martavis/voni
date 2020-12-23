import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { CartContext } from 'state/Cart';
import { useMutation } from '@apollo/client';
import { Order } from 'shopify-storefront-api-typings';
import { ADJUST_ITEM_QUANTITY, REMOVE_FROM_CART } from 'utils/gqlMutation';
import { formatPrice } from 'utils/functions';

import '../assets/styles/cart.scss';

import ItemCounter from 'components/ItemCounter';
import ProductImage from 'components/ProductImage';

type DF = React.FC<{ path?: String }>;

const Cart: DF = () => {
	const { cart, setCart }: { cart: Order, setCart: Function } = useContext(CartContext);
	const [adjustItemQuantity] = useMutation(ADJUST_ITEM_QUANTITY, {
		onCompleted: (data) => {
			if (data) {
				setCart(data.cart);
			} else {
				console.log('nope');
			}
		},
		onError: (error) => {
			console.error(error);
			alert('We could not adjust your quantity. Please refresh and try again, or contact us.');
		}
	});
	
	const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
		onCompleted: (data) => {
			if (data) {
				setCart(data.cart);
			} else {
				console.log('nope');
			}
		},
		onError: (error) => {
			console.error(error);
			alert('We could not remove this item from your cart. Please refresh and try again, or contact us.');
		}
	});

	const changeCartCount = async (orderLineId: string, quantity: number) => {
		try {
			await adjustItemQuantity({
				fetchPolicy: 'no-cache',
				variables: {
					orderLineId,
					quantity
				}
			});
		} catch(error) {
			console.log(error);
		}
	};

	const removeItem = async (orderLineId: string) => {
		try {
			await removeFromCart({
				fetchPolicy: 'no-cache',
				variables: {
					orderLineId
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="cart-container page-container">
			<h1 className="page-title">Shopping Cart</h1>
			<div className="cart-summary">{
				cart.lineItems.edges.length > 0 ? (
					<div className="cart-table">
						<div className="headers">
							<div className="header-name">Product</div>
							<div className="header-name">Price</div>
							<div className="header-name">Quantity</div>
							<div className="header-name">Total</div>
						</div>
						<div className="cart-items">{
							cart.lineItems.edges.map((line, i) => (
								<div key={i} className="item">
									<div className="item-image-name">
										<ProductImage src={line.node.variant.image.originalSrc} isSmall />
										<div className="title-delete">
											<p>{line.node.variant.title}</p>
											<div role="button" className="remove-item-button" onClick={() => removeItem(line.node.variant.id)}>
												<div className="button-text">
													<span>Remove</span>
													<div className="icon">
														<img alt={`remove ${line.node.variant.title}`} src="https://storage.googleapis.com/voni-assets/img/times.png" />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="item-price">${formatPrice(line.node.variant.unitPrice.amount)}</div>
									<div className="item-quantity">
										<ItemCounter count={line.node.currentQuantity} setCount={changeCartCount} lineId={line.node.variant.id} />
									</div>
									<div className="item-total">${formatPrice(line.node.originalTotalPrice.amount)}</div>
								</div>
							))
						}</div>
					</div>
				) : (
					<div className="sell-action">
						<p>There are no items in your cart.</p>
						<Link to="/shop">Start Shopping</Link>
					</div>
				)
			}</div>
			<div className="total">
				<div className="total-title">Items Subtotal</div>
				<div className="price-text" title={`$${formatPrice(cart.currentSubtotalPrice.amount)}`}>${formatPrice(cart.currentSubtotalPrice.amount)}</div>
			</div>
			<div className="cart-actions">
				<Link to="/shop" className="shop">Continue Shopping</Link>
				<Link to="/checkout" className="checkout">Proceed to Checkout</Link>
			</div>
		</div>
	);
};

export default Cart;
