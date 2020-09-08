import React, { useState, useContext } from 'react';
import { withRouteData } from 'react-static';
import { Product, ProductOption } from 'types/vendure';
import { useMutation } from '@apollo/client';
import { CartContext } from 'state/Cart';
import { formatPrice } from 'utils/functions';
import { ADD_TO_CART } from 'utils/gql';

import '../assets/css/single-product.scss';

import ItemCounter from 'components/ItemCounter';
import ProductImage from 'components/ProductImage';

const SingleProductPage = ({ product }: { product: Product }) => {
	const [quantity, setQuantity] = useState<number>(1);
	// const { product }: { product: Product } = useRouteData();
	const [selectedVariant, setSelectedVariant] = useState(0);
	const [selectedVariantImage] = useState(0);
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
	
	const { variants, description, featuredAsset } = product;
	const { options } = product.optionGroups.length > 0 && product.optionGroups[0];
	let price = formatPrice(variants[selectedVariant].price);
	
	const increaseCart = async () => {
		const { id } = variants[selectedVariant];

		try {
			await addToCart({
				fetchPolicy: 'no-cache',
				variables: {
					productVariantId: id,
					quantity: quantity
				}
			});
		} catch(error) {
			console.log(error);
		}
	};
	
	console.log(product)
	
	let imageToShow = featuredAsset;
	if (variants[selectedVariant]['assets'][selectedVariantImage]) {
		imageToShow = variants[selectedVariant]['assets'][selectedVariantImage];
	} else if (variants[selectedVariant]['featuredAsset']) {
		imageToShow = variants[selectedVariant]['featuredAsset'];
	}

	const hasSecondaryImages = variants[selectedVariant]['assets'].length > 0;
	return (
		<div className="single-product page">
			<div className="images" data-has-secondary={hasSecondaryImages}>
				{hasSecondaryImages && <div className="secondary"></div>}
				<div className="enlarged">
					<ProductImage src={imageToShow.source} />
				</div>
			</div>
			<div className="details">
				<p className="product-title">{product.name}</p>
				<p className="product-price">${price}</p>
				<div className="product-actions">
					{options && 
						<div className="product-options">{
							options.map(({ name }: ProductOption, i: number) => (
								<div 
									key={i}
									role="button"
									className={`option ${selectedVariant === i ? 'active' : ''}`} 
									onClick={() => setSelectedVariant(i)}
								>{name}</div>
							))
						}</div>
					}
					<div className="quantity">
						<span>Qty:</span>
						<ItemCounter count={quantity} setCount={setQuantity} />
					</div>
					<div className="add-to-cart">
						<div role="button" onClick={() => increaseCart()}>
							Add to Cart <img alt="" src="https://storage.googleapis.com/voni-assets/img/shopping-cart.svg" />
						</div>
					</div>
				</div>
				<div className="product-desc">
					<p>{description}</p>
				</div>
			</div>
		</div>
	)
};

// TODO: this isn't working...fix it!
const SingleProductWithData = withRouteData(SingleProductPage);

export default React.memo(SingleProductWithData, (prevProps, nextProps) => {
	console.log('hey');
	console.log(nextProps.product.id);
	if (prevProps.product.id === nextProps.product.id) {
		return false;
	}
	return true;
});