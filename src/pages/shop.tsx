import React from 'react';
import { useRouteData } from 'react-static';
import { Product, ProductList } from 'types/vendure';

import '../assets/styles/shop.scss';

import ProductComponent from 'components/Product';

export default () => {
	const { products }: { products: ProductList } = useRouteData();
	
	return (
		<div className="shop page">
			<h1 className="page-title">Products</h1>
			<section className="items">
				<div className="item-grid section-custom-border">{
					products.items.map((item: Product, i: number) => (
						<ProductComponent key={i} product={item} />
					))
				}</div>
			</section>
		</div>
	)
};
