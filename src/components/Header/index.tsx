import React, { useContext } from 'react';
import { Link, LinkGetProps } from '@reach/router';
import { CartContext } from 'state/Cart';
import { Order } from 'types/vendure';

import './Header.scss';

const Header: React.FC = () => {
	const { cart }: { cart: Order } = useContext(CartContext);
	
	const isActive = ({ isCurrent }: LinkGetProps) => {
		return isCurrent ? { className: "active" } : {};
	};

	let cartCount = null;
	if (cart && cart.lines) {
		cartCount = cart.lines.length;
	}

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
				<div className="cart-display">
					<Link to="/cart"><img alt="Shopping Cart" src="https://storage.googleapis.com/voni-assets/img/shopping-cart.svg" /></Link>
					{cartCount && <div className="cart-count">{cartCount}</div>}
				</div>
			</div>
		</nav>
	);
};

export default Header;
