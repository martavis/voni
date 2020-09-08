import React from 'react';

import './ProductImage.scss';

type Props = {
    src: string,
    isSmall?: boolean
};

const ProductImage = ({ src, isSmall }: Props) => {
    return (
        <div className="visual" data-small={isSmall}>
            <div className="image-overflow">
                <div className="product-image" style={{ backgroundImage: `url('${src.replace(/\\/gi, '/')}')` }}></div>
            </div>
        </div>
	);
};

export default ProductImage;
