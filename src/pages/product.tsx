import React, { useState, useContext } from 'react';
import { useRouteData } from 'react-static';
import { Product, ProductOption } from 'types/vendure';
import { useMutation } from '@apollo/client';
import { CartContext } from 'state/Cart';
import { formatPrice } from 'utils/functions';
import { ADD_TO_CART } from 'utils/gql';

import '../assets/css/single-product.scss';

export default () => {
	const { product }: { product: Product } = useRouteData();
	const [selectedVariant, setSelectedVariant] = useState(0);
	const { setCart } = useContext(CartContext);
	const [addToCart] = useMutation(ADD_TO_CART, {
		onCompleted: (data) => {
			if (data) {
				setCart(data.cart);
			} else {
				console.log('nope');
			}
		}
	});

	const { variants } = product;
	const { options } = product.optionGroups.length > 0 && product.optionGroups[0];
	let price = formatPrice(variants[selectedVariant].price);
	
	const increaseCart = async () => {
		const { id } = variants[selectedVariant];

		try {
			await addToCart({
				fetchPolicy: 'no-cache',
				variables: {
					productVariantId: id,
					quantity: 1
				}
			});
		} catch(error) {
			console.log(error);
		}
	};
	
	// console.log(product)
	return (
		<div className="single-product page">
			<div className="images"></div>
			<div className="details">
				<p className="product-title">{product.name}</p>
				<p className="product-price">${price}</p>
				<div className="product-actions">
					<div className="product-options">{
						options && options.map(({ name }: ProductOption, i: number) => (
							<div 
								key={i}
								role="button"
								className={`option ${selectedVariant === i ? 'active' : ''}`} 
								onClick={() => setSelectedVariant(i)}
							>{name}</div>
						))
					}</div>
					<div className="add-to-cart">
						<div role="button" onClick={() => increaseCart()}>
							Add to Cart <img alt="" src="https://storage.googleapis.com/voni-assets/img/shopping-cart.svg" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};