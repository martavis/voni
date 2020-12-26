import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { CartContext } from 'state/Cart';
import { useMutation } from '@apollo/client';
import { Checkout, CheckoutLineItemInput } from 'shopify-storefront-api-typings';
import { MODIFY_CART, REMOVE_FROM_CART } from 'utils/gqlMutation';
import { formatPrice, calculateQuantityTotal } from 'utils/functions';

import '../assets/styles/cart.scss';

import ItemCounter from 'components/ItemCounter';
import ProductImage from 'components/ProductImage';

type DF = React.FC<{ path?: String }>;

const Cart: DF = () => {
	const { cart, setCart }: { cart: Checkout, setCart: Function } = useContext(CartContext);
	const [modifyCart] = useMutation(MODIFY_CART, {
		onCompleted: ({ cart: { checkout } }) => {
			if (checkout) {
				setCart(checkout);
			} else {
				console.log('nope');
			}
		},
		onError: (error) => {
			console.error(error);
			alert('We could not change the quantity on your cart. Please refresh and try again, or contact us.');
		}
	});
	
	const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
		onCompleted: ({ cart: { checkout } }) => {
			if (checkout) {
				setCart(checkout);
			} else {
				console.log('nope');
			}
		},
		onError: (error) => {
			console.error(error);
			alert('We could not remove this item to your cart. Please refresh and try again, or contact us.');
		}
	});

	const changeCartCount = async (checkoutId: string, quantity: number, lineId: string) => {
		let lineItems: Array<CheckoutLineItemInput> = [];
		const itemIndexInCart = cart ? cart.lineItems.edges.findIndex(({ node }) => node.variant.id === lineId ) : -1;
		
		// restructure cart items, skipping the product with the old quantity
		cart.lineItems.edges.forEach(({ node }, i) => {
			if (i !== itemIndexInCart) {
				lineItems.push({ variantId: node.id, quantity: node.quantity });
			}
		});

		// add the new quantity of the product we're adding
		lineItems.push({variantId: lineId, quantity })
		
		try {
			await modifyCart({
				fetchPolicy: 'no-cache',
				variables: {
					lineItems,
					checkoutId
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
					checkoutId: cart.id,
					lineItemIds: [orderLineId]
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
				(cart && cart.lineItems.edges.length > 0) ? (
					<>
						<div className="cart-table">
							<div className="headers">
								<div className="header-name">Product</div>
								<div className="header-name">Price</div>
								<div className="header-name">Quantity</div>
								<div className="header-name">Total</div>
							</div>
							<div className="cart-items">{
								cart.lineItems.edges.map(({ node }, i) => {
									const title = node.variant.title === 'Default Title' ? node.title : node.variant.title;
									const totalItemPrice = calculateQuantityTotal(node.variant.priceV2.amount, node.quantity);
									
									return (
										<div key={i} className="item">
											<div className="item-image-name">
												<ProductImage src={node.variant.image.originalSrc} isSmall />
												<div className="title-delete">
													<p>{title}</p>
													<div role="button" className="remove-item-button" onClick={() => removeItem(node.id)}>
														<div className="button-text">
															<span>Remove</span>
															<div className="icon">
																<img alt={`remove ${title}`} src="https://storage.googleapis.com/voni-assets/img/times.png" />
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="item-price">${formatPrice(node.variant.priceV2.amount)}</div>
											<div className="item-quantity">
												<ItemCounter count={node.quantity} setCount={changeCartCount} lineId={node.variant.id} checkoutId={cart.id} />
											</div>
											<div className="item-total">${totalItemPrice}</div>
										</div>
									);
								})
							}</div>
						</div>
						<div className="total">
							<div className="total-title">Items Subtotal</div>
							<div className="price-text" title={`$${formatPrice(cart.subtotalPriceV2.amount)}`}>${formatPrice(cart.subtotalPriceV2.amount)}</div>
						</div>
						<div className="cart-actions">
							<Link to="/shop" className="shop">Continue Shopping</Link>
							<Link to="/checkout" className="checkout">Proceed to Checkout</Link>
						</div>
					</>
				) : (
					<div className="sell-action">
						<p>There are no items in your cart.</p>
						<Link to="/shop">Start Shopping</Link>
					</div>
				)
			}</div>
		</div>
	);
};

export default Cart;
