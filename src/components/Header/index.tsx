import React from 'react';
import { Link, LinkGetProps } from '@reach/router';

import './Header.scss';

const Header: React.FC = () => {
	const isActive = ({ isCurrent }: LinkGetProps) => {
		return isCurrent ? { className: "active" } : {};
	};

    return (
		<nav>
			<div className="logo">
				<Link to="/"><img alt="Voni Aesthetics" src="https://storage.googleapis.com/voni-assets/img/logo.svg" /></Link>
				<div className="border"></div>
			</div>
			<div className="page-links">
				<Link to="/shop" getProps={isActive}>Shop</Link>
				<Link to="/about" getProps={isActive}>About</Link>
				<Link to="/ambassador" getProps={isActive}>Ambassador</Link>
				<div className="search-site" role="button"><img alt="Search Products" src="https://storage.googleapis.com/voni-assets/img/search-button.svg" /></div>
				<Link to="/cart"><img alt="Shopping Cart" src="https://storage.googleapis.com/voni-assets/img/shopping-cart.svg" /></Link>
			</div>
		</nav>
	);
};

export default Header;
