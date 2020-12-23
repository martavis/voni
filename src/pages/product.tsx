import React, { useState, useContext } from 'react';
import { withRouteData } from 'react-static';
import { 
	Product, 
	ProductOption, 
	ProductVariantConnection,
	Checkout,
	CheckoutLineItemInput
} from 'shopify-storefront-api-typings';
import { useMutation } from '@apollo/client';
import { CartContext } from 'state/Cart';
import { formatPrice } from 'utils/functions';
import { CREATE_CART, MODIFY_CART } from 'utils/gqlMutation';

import '../assets/styles/single-product.scss';

import ItemCounter from 'components/ItemCounter';
import ProductImage from 'components/ProductImage';

const SingleProductPage = ({ product }: { product: Product }) => {
	const [quantity, setQuantity] = useState<number>(1);
	const [selectedVariant, setSelectedVariant] = useState(0);
	// const [selectedVariantImage] = useState(0);
	const { cart, setCart }: { cart: Checkout, setCart: Function } = useContext(CartContext);
	const [createCart] = useMutation(CREATE_CART, {
		onCompleted: ({ cart: { checkout } }) => {
			if (checkout) {
				setCart(checkout);
			} else {
				console.log('nope');
			}
		},
		onError: (error) => {
			console.error(error);
			alert('We could not add this item to your cart. Please refresh and try again, or contact us.');
		}
	});

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
			alert('We could not add this item to your cart. Please refresh and try again, or contact us.');
		}
	});
	
	const { variants, description }: {variants: ProductVariantConnection, description: string } = product;
	const options: Array<ProductOption> = product.options.length > 0 && product.options.filter(({ name }) => name !== 'Title'); // Shopify keeps a default for some reason :|
	let price = formatPrice(variants.edges[selectedVariant].node.priceV2.amount);
	
	const addToCart = async () => {
		const { id } = variants.edges[selectedVariant].node;
		
		const itemIndexInCart = cart ? cart.lineItems.edges.findIndex((item) => item.node.variant.id === id ) : -1;
		let lineItems: Array<CheckoutLineItemInput> = [{ variantId: id, quantity }];
		
		// modify cart
		if (itemIndexInCart > -1) {
			lineItems = [];
			const newQuantity = cart.lineItems.edges[itemIndexInCart].node.quantity + quantity; // add state's quantity
			
			// restructure cart items, skipping the product with the old quantity
			cart.lineItems.edges.forEach(({ node }, i) => {
				if (i !== itemIndexInCart) {
					lineItems.push({ variantId: node.id, quantity: node.quantity });
				}
			});

			// add the new quantity of the product we're adding
			lineItems.push({variantId: id, quantity: newQuantity})
		}

		try {
			if (cart) {
				await modifyCart({
					fetchPolicy: 'no-cache',
					variables: { 
						lineItems,
						checkoutId: cart.id
					}
				});
				return;
			}

			await createCart({
				fetchPolicy: 'no-cache',
				variables: { input: { lineItems } }
			});
			return;
		} catch(error) {
			console.log(error);
		}
	};
	
	let selectedVariantNode = variants.edges[selectedVariant].node;
	// let imageToShow = selectedVariantNode;
	// if (variants[selectedVariant]['assets'][selectedVariantImage]) {
	// 	imageToShow = variants[selectedVariant]['assets'][selectedVariantImage];
	// } else if (variants[selectedVariant]['featuredAsset']) {
	// 	imageToShow = variants[selectedVariant]['featuredAsset'];
	// }

	const hasSecondaryImages = false;
	return (
		<div className="single-product page">
			<div className="images" data-has-secondary={hasSecondaryImages}>
				{hasSecondaryImages && <div className="secondary"></div>}
				<div className="enlarged">
					<ProductImage src={selectedVariantNode.image.originalSrc} />
				</div>
			</div>
			<div className="details">
				<p className="product-title">{product.title}</p>
				<p className="product-price">${price}</p>
				<div className="product-actions">
					{options.length > 0 && 
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
						<div role="button" onClick={() => addToCart()}>
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