import React, { useContext, useState } from 'react';
import { Link, LinkGetProps } from '@reach/router';
import { useMutation } from '@apollo/client';
import { CartContext } from 'state/Cart';
import { Order, Customer } from 'types/vendure';
import { CustomerContext } from 'state/Customer';
import { LOGOUT } from 'utils/gqlMutation';
import './Header.scss';

const Header: React.FC = () => {
	const { cart }: { cart: Order } = useContext(CartContext);
	const { token, customer, setToken } : { token: String, customer: Customer, setToken: Function, setCustomer: Function} = useContext(CustomerContext);	

	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const isActive = ({ isCurrent }: LinkGetProps) => {
		// toggleMenu();
		return isCurrent ? { className: "active" } : {};
	};
	
	let cartCount = null;
	if (cart && cart.lines) {
		cartCount = cart.lines.length;
	}
	let logout = () => { 
		try {
			logoutAccount({
				fetchPolicy: 'no-cache',
				variables: {}
            });
		} catch (error) {
			console.log(error);
		}
	}

	let toggleMenu = () => { 
		setShowMobileMenu(!showMobileMenu);
		if (showMobileMenu) {
			document.getElementById('content').style.display = 'block';
			document.getElementsByTagName("footer")[0].style.display = 'block';
		} else {
			document.getElementById('content').style.display = 'none';
			document.getElementsByTagName("footer")[0].style.display = 'none';
		}
	}

	const [logoutAccount] = useMutation(LOGOUT, {
		onCompleted: (data) => {
			if (data) {						                
				setToken("");
				window.location.href=("/login");
			} else {
				console.log('nope');
			}
		},
		onError: (error) => {
			console.error(error);
		}
    });  

    return (
		<nav className="menu-open">
			<div id="mobile-nav-button" onClick={toggleMenu}>
				<span className="menu-icon-bar"></span>
				<span className="menu-icon-bar"></span>
				<span className="menu-icon-bar"></span>
			</div>
			{	showMobileMenu ? 
				<div id="navigationMobile" onClick={toggleMenu}>
					<div id="navigationDropdown" className="is-invisible">
						<Link to="/" getProps={isActive}>Home</Link>
						<Link to="/shop" getProps={isActive}>Shop</Link>
						{/* <Link to="/about" getProps={isActive}>About</Link> */}
						{/* <Link to="/ambassador" getProps={isActive}>Ambassador</Link> */}
						{ 
							token == null ? <>
								<Link to="/login" getProps={isActive}>Login</Link>				
								<Link to="/register" getProps={isActive}>Register</Link>
							</> : <>
								<Link to="/profile" getProps={isActive}>{ customer.firstName + ' ' + customer.lastName }</Link>
								<a onClick={logout}>Log out</a>
							</>
						}
					</div>
				</div>
				: 
				''
			}
			<div className="logo">
				<Link to="/"><img alt="Voni Aesthetics" src="https://storage.googleapis.com/voni-assets/img/logo.svg"/></Link>
				<div className="border"></div>
			</div>
			<div className="page-links">
				<Link to="/" getProps={isActive}>Home</Link>
				<Link to="/shop" getProps={isActive}>Shop</Link>
				{/* <Link to="/about" getProps={isActive}>About</Link> */}
				{/* <Link to="/ambassador" getProps={isActive}>Ambassador</Link> */}
				{ 
					token == null ? <>
						<Link to="/login" getProps={isActive}>Login</Link>				
						<Link to="/register" getProps={isActive}>Register</Link>
					</> : <>
						<Link to="/profile" getProps={isActive}>{ customer.firstName + ' ' + customer.lastName }</Link>
						<a onClick={logout}>Log out</a>
					</>
				}
				{/* <div className="search-site" role="button"><img alt="Search Products" src="https://storage.googleapis.com/voni-assets/img/search-button.svg" /></div> */}
				<div className="cart-display">
					<Link to="/cart"><img alt="Shopping Cart" src="https://storage.googleapis.com/voni-assets/img/shopping-cart.svg" /></Link>
					{cartCount && <div className="cart-count">{cartCount}</div>}
				</div>
			</div>
		</nav>
	);
};

export default Header;
