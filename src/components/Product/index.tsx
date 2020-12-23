import React from 'react';
import { Link } from '@reach/router';
import { Product, ProductVariantEdge } from 'shopify-storefront-api-typings';
import { formatPrice } from 'utils/functions';

import './Product.scss';

import ProductImage from 'components/ProductImage';

type Props = {
    product: Product
};

const ProductComponent = ({ product }: Props) => {
    let variants: Array<ProductVariantEdge> = product.variants.edges;
    let price = formatPrice(variants[0].node.priceV2.amount); // default to first variant
    price = variants.length > 1 ? `From $${formatPrice(product.priceRange.minVariantPrice.amount)}` : `$${price}`;

    return (
        <Link to={`/shop/product/${product.handle}`}>
            <div className="product-component">
                <ProductImage src={variants[0].node.image.originalSrc} />
                <div className="info">
                    <p className="title">{product.title}</p>
                    <p className="price">{price}</p>
                </div>
            </div>
        </Link>
	);
};

export default ProductComponent;
