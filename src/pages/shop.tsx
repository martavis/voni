import React, { useState } from 'react';
import { useRouteData, Head } from 'react-static';
import { ProductEdge, ProductConnection } from 'shopify-storefront-api-typings';

import '../assets/styles/shop.scss';

import ProductComponent from 'components/Product';

export default () => {
	const { products }: { products: ProductConnection } = useRouteData();
	// const [productsToShow, setProductsToShow] = useState<Array<Product>>(products);
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	// const [showCount, setShowCount] = useState<number>(5);

	// useEffect(() => {
	// 	const limitedProductsToShow = productsToShow.slice(0, showCount);
	// 	setProductsToShow(limitedProductsToShow);
	// }, [showCount])

	// const filterByCategory = (e: ChangeEvent<HTMLSelectElement>) => {
	// 	const newProducts = products.items.filter((product: Product) => {
	// 		return product.collections.filter(c => c.id === e.target.value).length > 0;
	// 	}) as Array<Product>;

	// 	setSelectedCategory(e.target.value);
	// 	setProductsToShow(newProducts);
	// };

	return (
		<div className="shop page">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Shop | Voni Aesthetics</title>
				<meta name="description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
				<meta name="keywords" content="Voni, Aesthetics, clothing, apparel, fashion, accessories"></meta>
				<meta property="og:title" content="Shop | Voni Aesthetics" />
				<meta property="og:description" content="The apparel line of the future is here. Astro Collection available now for purchase." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://voni.us/shop" />
				<meta property="og:image" content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png" />
				<meta property="og:image:secure_url" content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png" />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="1366" />
				<meta property="og:image:height" content="768" />
				<meta property="og:image:alt" content="Voni Aesthetics" />
				<link rel="apple-touch-icon" sizes="180x180" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-16x16.png" />
				<link rel="manifest" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/site.webmanifest" />
				<link rel="mask-icon" href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/safari-pinned-tab.svg" color="#3a551a" />
				<meta name="msapplication-TileColor" content="#00a300" />
				<meta name="theme-color" content="#ffffff"></meta>
			</Head>
			<h1 className="page-title">Shop</h1>
			{/* <div className="filters">
				<div className="categories">
					<div>
						<label>Categories:</label>
						<select value={selectedCategory} onChange={filterByCategory}>
							<option value="">All Products</option>
							{collections.map(({ id, name }: Collection) => (
								<option key={id} value={id}>{name}</option>
							))}
						</select>
					</div>
					<div className="product-count">{productsToShow.length}&nbsp;&nbsp;items</div>
				</div>
				<div className="show-count">
					<label>Show:</label>
					<select value={showCount} onChange={(e) => setShowCount(parseInt(e.target.value))}>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
					</select>
				</div>
			</div> */}
			<section className="items">
				<div className="item-grid section-custom-border">{
					products && products.edges.map((product: ProductEdge, i: number) => (
						<ProductComponent key={i} product={product.node} />
					))
				}</div>
			</section>
		</div>
	)
};
