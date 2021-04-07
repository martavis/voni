import React from 'react';

import './ProductImage.scss';

import LoadingAnimation from 'components/LoadingAnimation';

type Props = {
    src: string,
    isSmall?: boolean
};

const ProductImage = ({ src, isSmall }: Props) => {
    return (
		<div className="visual" data-small={isSmall}>
			<LoadingAnimation />
			<div className="image-overflow">
				<div className="product-image" style={{ backgroundImage: `url('${src.replace(/\\/gi, '/')}')` }}></div>
			</div>
		</div>
	);
};

export default ProductImage;
