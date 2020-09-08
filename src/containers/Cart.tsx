import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { CartContext } from 'state/Cart';
import { useMutation } from '@apollo/client';
import { Order } from 'types/vendure';
import { ADJUST_ITEM_QUANTITY } from 'utils/gql';
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

	const increaseCart = async (orderLineId: string, quantity: number) => {
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

	return (
		<div className="cart-container page-container">
			<h1 className="page-title">Shopping Cart</h1>
			<div className="cart-summary">{
				cart.lines.length > 0 ? (
					<div className="cart-table">
						<div className="headers">
							<div className="header-name">Product</div>
							<div className="header-name">Price</div>
							<div className="header-name">Quantity</div>
							<div className="header-name">Total</div>
						</div>
						<div className="cart-items">{
							cart.lines.map((line, i) => (
								<div key={i} className="item">
									<div className="item-image-name">
										<ProductImage src={line.featuredAsset.source} isSmall />
										<p>{line.productVariant.name}</p>
									</div>
									<div className="item-price">${formatPrice(line.unitPrice)}</div>
									<div className="item-quantity">
										<ItemCounter count={line.quantity} setCount={increaseCart} lineId={line.id} />
									</div>
									<div className="item-total">${formatPrice(line.totalPrice)}</div>
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
				<div className="total-title">Total Price</div>
				<div className="price-text" title={`$${formatPrice(cart.total)}`}>${formatPrice(cart.total)}</div>
			</div>
			<div className="cart-actions">
				<Link to="/shop" className="shop">Continue Shopping</Link>
				<Link to="/checkout" className="checkout">Proceed to Checkout</Link>
			</div>
		</div>
	);
};

export default Cart;
