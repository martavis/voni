import React, { useEffect } from 'react';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Link, Router, useLocation } from '@reach/router';
import { ApolloProvider } from '@apollo/client';
import gqlClient from 'utils/gqlClient';
import CartProvider from 'state/Cart';
import CustomerProvider from 'state/Customer';
import ShippingProvider from 'state/Shipping';

import './assets/styles/app.scss';

import Header from 'components/Header';
import Cart from 'containers/Cart';
import Account from 'containers/Account';
import { ToastProvider } from 'react-toast-notifications';

// non-static routes
addPrefetchExcludes(['cart', 'account', 'account/shipping', 'account/payment']);

function App() {
	return (
		<ApolloProvider client={gqlClient}>
			<Root>
				<CartProvider>
					<CustomerProvider>
						<ShippingProvider>
							<ToastProvider 
								autoDismiss={true}
								autoDismissTimeout={5000}
								placement="top-center"
								transitionDuration={300}
							>
								<Header />
								<div className="content" id="content">
									<React.Suspense fallback={<em>Loading...</em>}>
										<ScrollToTop />
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
										<Link to="/terms">Terms</Link> 	
										<div className="footer-border"></div>
										<Link to="/privacy">Privacy</Link> 
									</div>
								</footer>
							</ToastProvider>
						</ShippingProvider>
					</CustomerProvider>
				</CartProvider>
			</Root>
		</ApolloProvider>
	)
};

const ScrollToTop = (): null => {
	const { pathname } = useLocation();

	useEffect(() => {
		if (typeof document !== 'undefined') {
			window.scrollTo(0, 0);
		}
	}, [pathname]);

	return null;
}

export default App;
