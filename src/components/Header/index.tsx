import React from 'react';
import { Link } from '@reach/router';

import './Header.scss';

const Header: React.FC = () => {
    return (
		<nav>
			<div className="logo">
				<Link to="/"><img alt="Voni Aesthetics" src="https://storage.googleapis.com/voni-assets/img/logo.svg" /></Link>
			</div>
			<div className="page-links">
				<Link to="/shop">Shop</Link>
				<Link to="/contact">Contact</Link>
				<Link to="/ambassador">Ambassador</Link>
				<div className="search-site" role="button"><img alt="Search Products" src="https://storage.googleapis.com/voni-assets/img/search-button.svg" /></div>
				<Link to="/cart"><img alt="Shopping Cart" src="https://storage.googleapis.com/voni-assets/img/shopping-cart.svg" /></Link>
			</div>
		</nav>
	);
};

export default Header;
