import React from 'react';
import { Link } from '@reach/router';
import { Product } from 'types/vendure';
import { formatPrice } from 'utils/functions';

import './Product.scss';

type Props = {
    product: Product
};

const ProductComponent = ({ product }: Props) => {
    let price = formatPrice(product.variants[0].price); // default to first variant
    price = product.variants.length > 1 ? `From $${price}` : `$${price}`;
    const image = product.featuredAsset.source.replace(/\\/gi, '/'); // because for some reason on the admin UI there are backslashes on the images🙄 

    return (
        <Link to={`/shop/product/${product.slug}`}>
            <div className="product-component">
                <div className="visual">
                    <div className="image-overflow">
                        <div className="corner-clip top"></div>
                        <div className="corner-clip bottom"></div>
                        <div className="product-image" style={{ backgroundImage: `url('${image}')` }}></div>
                    </div>
                </div>
                <div className="info">
                    <p className="title">{product.name}</p>
                    <p className="price">{price}</p>
                </div>
            </div>
        </Link>
	);
};

export default ProductComponent;
