import React from 'react';
import { Link } from '@reach/router';
import { Product } from 'types/vendure';

import './Product.scss';

type Props = {
    product: Product
};

const ProductComponent = ({ product }: Props) => {
    console.log(product)
    const priceStr = product.variants[0].price.toString(); // get first
    const cents = priceStr.substr(-2);
    let price = priceStr.substring(0, priceStr.lastIndexOf(cents)) + `.${cents}`;
    price = product.variants.length > 1 ? `From $${price}` : `$${price}`;
    const image = product.featuredAsset.source.replace(/\\/gi, '/'); // because for some reason on the admin UI there are backslashes on the images🙄 

    return (
        <Link to={`/shop/product/${product.slug}`}>
            <div className="product-component">
                <div className="visual">
                    <div className="image-overflow">
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
