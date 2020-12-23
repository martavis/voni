import React, { useState } from 'react';
import { useRouteData } from 'react-static';
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
			<h1 className="page-title">Products</h1>
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
