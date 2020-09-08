import React from 'react';

import './ProductImage.scss';

type Props = {
    src: string
};

const ProductImage = ({ src }: Props) => {
    return (
        <div className="visual">
            <div className="image-overflow">
                <div className="corner-clip top"></div>
                <div className="corner-clip bottom"></div>
                <div className="product-image" style={{ backgroundImage: `url('${src.replace(/\\/gi, '/')}')` }}></div>
            </div>
        </div>
	);
};

export default ProductImage;
