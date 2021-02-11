import React from 'react';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Link, Router } from '@reach/router';
import { ApolloProvider } from '@apollo/client';
import gqlClient from 'utils/gqlClient';
import CartProvider from 'state/Cart';
import CustomerProvider from 'state/Customer';
import ShippingProvider from 'state/Shipping';

import './assets/styles/app.scss';

import Header from 'components/Header';
import Cart from 'containers/Cart';
import Account from 'containers/Account';

// non-static routes
addPrefetchExcludes(['cart', 'account', 'account/shipping', 'account/payment']);

function App() {
	return (
		<ApolloProvider client={gqlClient}>
			<Root>
				<CartProvider>
					<CustomerProvider>
						<ShippingProvider>
							<Header />
							<div className="content" id="content">
								<React.Suspense fallback={<em>Loading...</em>}>
									<Router>
										<Cart path="cart" />
										<Account path="account"/>
										<Account path="account/shipping"/>
										<Account path="account/payment"/>
										<Routes default />
									</Router>
								</React.Suspense>
							</div>
							<footer>
								<div className="left">
									{new Date().getFullYear()} &trade;&nbsp;Voni Aesthetics - All Rights Reserved 
								</div>
								<div className="right">
									<Link to="/about">About</Link>
									<div className="footer-border"></div>
									<Link to="/contact">Contact</Link>
									<div className="footer-border"></div>
									<Link to="/terms">Terms of Service</Link> 	
									<div className="footer-border"></div>
									<Link to="/privacy">Privacy Policy</Link> 
								</div>
							</footer>
						</ShippingProvider>
					</CustomerProvider>
				</CartProvider>
			</Root>
		</ApolloProvider>
	)
};

// const ScrollToTop = (): null => {
// 	const { pathname } = useLocation();

// 	useEffect(() => {
// 		if (typeof document !== 'undefined') {
// 			window.scrollTo(0, 0);
// 		}
// 	}, [pathname]);

// 	return null;
// }

export default App;
