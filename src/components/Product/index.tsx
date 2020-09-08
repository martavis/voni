import React from 'react';
import { Link } from '@reach/router';
import { Product } from 'types/vendure';
import { formatPrice } from 'utils/functions';

import './Product.scss';

import ProductImage from 'components/ProductImage';

type Props = {
    product: Product
};

const ProductComponent = ({ product }: Props) => {
    let price = formatPrice(product.variants[0].price); // default to first variant
    price = product.variants.length > 1 ? `From $${price}` : `$${price}`;

    return (
        <Link to={`/shop/product/${product.slug}`}>
            <div className="product-component">
                <ProductImage src={product.featuredAsset.source} />
                <div className="info">
                    <p className="title">{product.name}</p>
                    <p className="price">{price}</p>
                </div>
            </div>
        </Link>
	);
};

export default ProductComponent;
