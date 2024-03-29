import React, { useContext, useEffect, useState } from 'react';
import { Link, LinkGetProps, navigate, useLocation } from '@reach/router';
import { useMutation } from '@apollo/client';
import { CartContext } from 'state/Cart';
import { Checkout, Customer } from 'shopify-storefront-api-typings';
import { CustomerContext } from 'state/Customer';
import { ShippingContext } from 'state/Shipping';
import { LOGOUT } from 'utils/gqlMutation';
import './Header.scss';

const Header: React.FC = () => {
	const { cart }: { cart: Checkout } = useContext(CartContext);
	const { token, setToken, setCustomer }: { token: String, customer: Customer, setToken: Function, setCustomer: Function} = useContext(CustomerContext);	
	const {setShipping} : {setShipping: Function} = useContext(ShippingContext);
	const pageLocation = useLocation();

	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const isActive = ({ isCurrent }: LinkGetProps) => {
		return isCurrent ? { className: 'active' } : {};
	};

	// reset mobile menu on page load
	useEffect(() => {
		if (pageLocation) {
			setShowMobileMenu(false);
		}
	}, [pageLocation]);
	
	const [logout] = useMutation(LOGOUT, {
		onCompleted: () => {
			setToken(null);
			setCustomer(null);
			setShipping(null);
			navigate('/login');
		},
		onError: (error) => {
			console.error(error);
		}
	}); 

	let cartCount = null;
	if (cart && cart.lineItems) {
		cartCount = cart.lineItems.edges.length;
	}

	let submitLogout = () => { 
		try {
			logout({
				fetchPolicy: 'no-cache',
				variables: {
					customerAccessToken: token
				}
            });
		} catch (error) {
			console.log(error);
		}
	}

	let toggleMenu = () => { 
		const shouldShow = !showMobileMenu;
		setShowMobileMenu(shouldShow);

		if (shouldShow) {
			document.getElementById('content').style.display = 'none';
			document.getElementsByTagName('footer')[0].style.display = 'none';
		} else {
			document.getElementById('content').style.display = 'block';
			document.getElementsByTagName('footer')[0].style.display = 'block';
		}
	}

    return (
		<nav>
			<div className="mobile">
				<div id="mobile-nav-button" onClick={toggleMenu}>
					<span className="menu-icon-bar"></span>
					<span className="menu-icon-bar"></span>
					<span className="menu-icon-bar"></span>
				</div>
				{showMobileMenu && (
					<div id="navigationMobile" onClick={toggleMenu}>
						<div id="navigationDropdown">
							<Link to="/" getProps={isActive}>
								Home
							</Link>
							<Link to="/shop" getProps={isActive}>
								Shop
							</Link>
							<Link to="/lookbook" getProps={isActive}>
								Lookbook
							</Link>
							<Link to="/sizes" getProps={isActive}>
								Size Guide
							</Link>
							<Link to="/about" getProps={isActive}>
								About
							</Link>
							<Link to="/faqs">FAQs</Link>
							<Link to="/shipping">Shipping</Link>
							<Link to="/returns">Returns</Link>
							{/* <Link to="/ambassador" getProps={isActive}>Ambassador</Link> */}
							<Link to="/contact" getProps={isActive}>
								Contact
							</Link>
							<Link to="/terms" getProps={isActive}>
								Terms of Service
							</Link>
							<Link to="/privacy" getProps={isActive}>
								Privacy Policy
							</Link>
							{token === null ? (
								<>
									<Link to="/login" getProps={isActive}>
										Log In
									</Link>
									<Link to="/register" getProps={isActive}>
										Register
									</Link>
								</>
							) : (
								<>
									<Link to="/account" getProps={isActive}>
										Account
									</Link>
									<a onClick={submitLogout}>Log Out</a>
								</>
							)}
						</div>
					</div>
				)}
			</div>
			<div className="tablet-desktop">
				<div className="logo">
					<Link to="/">
						<img alt="Voni Aesthetics" src="https://storage.googleapis.com/voni-assets/img/logo.svg" />
					</Link>
					<div className="border"></div>
				</div>
				<div className="page-links">
					{/* <Link to="/" getProps={isActive}>Home</Link> */}
					<Link to="/shop" getProps={isActive}>
						Shop
					</Link>
					<Link to="/lookbook" getProps={isActive}>
						Lookbook
					</Link>
					{/* <Link to="/ambassador" getProps={isActive}>Ambassador</Link> */}
					{token === null ? (
						<>
							<Link to="/login" getProps={isActive}>
								Log In
							</Link>
							<Link to="/register" getProps={isActive}>
								Register
							</Link>
						</>
					) : (
						<>
							<Link to="/account" getProps={isActive}>
								Account
							</Link>
							<a onClick={submitLogout}>Log Out</a>
						</>
					)}
					{/* <div className="search-site" role="button"><img alt="Search Products" src="https://storage.googleapis.com/voni-assets/img/search-button.svg" /></div> */}
				</div>
			</div>
			<div className="cart-display">
				<Link to="/cart">
					<img alt="Shopping Cart" src="https://storage.googleapis.com/voni-assets/img/shopping-cart.svg" />
				</Link>
				{cartCount !== null && cartCount > 0 && <div className="cart-count">{cartCount}</div>}
			</div>
		</nav>
	);
};

export default Header;
