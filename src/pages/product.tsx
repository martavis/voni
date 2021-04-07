import React, { useState, useContext, useEffect } from 'react';
import { withRouteData, Head } from 'react-static';
import { useMutation } from '@apollo/client';
import { useLocation } from '@reach/router';
import { useToasts } from 'react-toast-notifications';
import { CartContext } from 'state/Cart';
import { formatPrice, saveNewCart } from 'utils/functions';
import { CREATE_CART, ADD_MORE_TO_CART } from 'utils/gqlMutation';
import {
	Product,
	ProductOption,
	ProductVariantConnection,
	Checkout,
	CheckoutLineItemInput,
	ProductVariant,
	ProductVariantEdge,
	ImageConnection,
} from 'shopify-storefront-api-typings';

import '../assets/styles/single-product.scss';

import ItemCounter from 'components/ItemCounter';
import ProductImage from 'components/ProductImage';

const SingleProductPage = ({ product }: { product: Product }) => {
	if (!product) {
		return null;
	}

	const [quantity, setQuantity] = useState<number>(1);
	const [selectedOptions, setSelectedOptions] = useState<any>(null); // because there inifinite options, use 0 as default index for all options
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null); // because there inifinite options, use 0 as default index for all options
	const [productImages, setProductImages] = useState<Array<string>>([]);
	const [imageIndex, setImageIndex] = useState<number>(0);
	const { cart, setCart }: { cart: Checkout; setCart: Function } = useContext(CartContext);
	const { href } = useLocation();
	const { addToast } = useToasts();
	const {
		variants,
		description,
		images,
	}: { variants: ProductVariantConnection; description: string; images: ImageConnection } = product;

	// Shopify keeps a default for some reason :|
	const options: Array<ProductOption> =
		product.options.length > 0 && product.options.filter(({ name }) => name !== 'Title');

	const [createCart] = useMutation(CREATE_CART, {
		onCompleted: ({ cart: { checkout } }) => {
			saveNewCart(checkout, setCart);
			addToast('This item has been added to your cart.', { appearance: 'success' });
		},
		onError: (error) => {
			console.error(error);
			addToast('We could not add this item to your cart. Please refresh and try again, or contact us.', {
				appearance: 'error',
			});
		},
	});

	const [addMoreToCart] = useMutation(ADD_MORE_TO_CART, {
		onCompleted: ({ cart: { checkout } }) => {
			saveNewCart(checkout, setCart);
			addToast('This item has been added to your cart.', { appearance: 'success' });
		},
		onError: (error) => {
			console.error(error);
			addToast('We could not add this item to your cart. Please refresh and try again, or contact us.', {
				appearance: 'error',
			});
		},
	});

	useEffect(() => {
		const selectedOptions = selectedVariant ? selectedVariant.title.split(' / ') : null;
		let options = {};
		product.options.forEach(({ name, values }: ProductOption) => {
			if (selectedOptions) {
				// match the selected variant with the corresponding option buttons
				options[name] = selectedOptions.shift();
			} else {
				// initialize options object since each product has infinite options
				options[name] = values[0];
			}
		});

		setSelectedOptions(options);
	}, [selectedVariant]);

	// select the variant by the options chosen - options are in the variant title
	useEffect(() => {
		if (selectedOptions) {
			const variantTitle = Object.values(selectedOptions).join(' / ');
			const variant = variants.edges.find((variant: ProductVariantEdge) => variant.node.title === variantTitle)
				.node;
			setSelectedVariant(variant);
		}
	}, [selectedOptions]);

	// for the image carousel
	useEffect(() => {
		if (images && images.edges.length > 0) {
			let allImages = [];
			images.edges
				.filter(({ node: { altText } }) => {
					if (selectedOptions && selectedOptions.Color) {
						return altText?.includes(selectedOptions.Color);
					}

					// allow all images (i.e. for the bag)
					return true;
				})
				.map(({ node: { originalSrc } }, i) => allImages.push(originalSrc));

			setProductImages(allImages);
			setImageIndex(0);
		}

		return () => {};
	}, [selectedVariant, images]);

	const addToCart = async () => {
		const { id } = selectedVariant;
		let lineItems: Array<CheckoutLineItemInput> = [{ variantId: id, quantity }];

		try {
			if (cart) {
				await addMoreToCart({
					fetchPolicy: 'no-cache',
					variables: {
						lineItems,
						checkoutId: cart.id,
					},
				});
				return;
			}

			await createCart({
				fetchPolicy: 'no-cache',
				variables: { input: { lineItems } },
			});
			return;
		} catch (error) {
			console.log(error);
		}
	};

	const handleOptionChange = (key: string, value: string): void => {
		let oldOptions = selectedOptions;
		const newOptions = {
			...oldOptions,
			[key]: value,
		};

		setSelectedOptions(newOptions);
	};

	const setCarousel = (direction: 'prev' | 'next'): void => {
		let index = imageIndex;
		let minIndex = 0;
		let maxIndex = productImages.length - 1;

		if (direction === 'prev') {
			if (index - 1 < minIndex) {
				setImageIndex(0);
			} else {
				setImageIndex(--index);
			}
		} else {
			if (index + 1 > maxIndex) {
				setImageIndex(0);
			} else {
				setImageIndex(++index);
			}
		}
	};

	let price = selectedVariant ? formatPrice(selectedVariant.priceV2.amount) : '';

	return (
		<div className="single-product page">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{product.title} | Voni Aesthetics</title>
				<meta name="description" content={description} />
				<meta name="keywords" content="Voni, Aesthetics, clothing, apparel, fashion, accessories"></meta>
				<meta property="og:title" content={`${product.title} | Voni Aesthetics`} />
				<meta property="og:description" content={description} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={href} />
				<meta property="og:image" content={variants.edges[0].node.image.originalSrc} />
				<meta property="og:image:secure_url" content={variants.edges[0].node.image.originalSrc} />
				<meta property="og:image:type" content="image/jpeg" />
				<meta property="og:image:alt" content={product.title} />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-16x16.png"
				/>
				<link
					rel="manifest"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/site.webmanifest"
				/>
				<link
					rel="mask-icon"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/safari-pinned-tab.svg"
					color="#3a551a"
				/>
				<meta name="msapplication-TileColor" content="#00a300" />
				<meta name="theme-color" content="#ffffff"></meta>
			</Head>
			{productImages.length > 0 && (
				<div className="images">
					<div className="enlarged">
						<ProductImage src={productImages[imageIndex]} />
					</div>
					<div className="actions">
						<button onClick={() => setCarousel('prev')}>Previous</button>
						<button onClick={() => setCarousel('next')}>Next</button>
					</div>
				</div>
			)}
			<div className="details">
				<p className="product-title">{product.title}</p>
				<p className="product-price">${price}</p>
				<div className="product-options">
					{options.map(({ name, values }: ProductOption, i: number) => (
						<div key={i} className="product-option-row">
							<span>{name}</span>
							{values.map((value: string, k: number) => (
								<div
									key={k}
									role="button"
									className={`option ${
										selectedOptions && selectedOptions[name] === value ? 'active' : ''
									}`}
									onClick={() => handleOptionChange(name, value)}>
									{value}
								</div>
							))}
						</div>
					))}
				</div>
				<div className="product-actions">
					<div className="quantity">
						<span>Qty:</span>
						<ItemCounter count={quantity} setCount={setQuantity} />
					</div>
					<div className="add-to-cart">
						<div role="button" onClick={() => addToCart()}>
							Add to Cart{' '}
							<img alt="" src="https://storage.googleapis.com/voni-assets/img/shopping-cart.svg" />
						</div>
					</div>
				</div>
				<div className="product-desc">
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
};

export default withRouteData(SingleProductPage);
