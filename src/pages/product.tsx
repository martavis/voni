import React from 'react';
import { useRouteData } from 'react-static';
// import { Link } from '@reach/router';
import { Product } from 'types/vendure';

import '../assets/css/shop.scss';

export default () => {
	const { product }: { product: Product } = useRouteData();
	
	return (
		<div className="shop page">
			<p className="page-title">{product.name}</p>
		</div>
	)
};