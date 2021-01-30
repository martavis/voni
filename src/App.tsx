import React from 'react';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Link, Router } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';
import CartProvider from 'state/Cart';
import CustomerProvider from 'state/Customer';
import ShippingProvider from 'state/Shipping';
import gqlClient  from 'utils/gqlClient';
import Header from 'components/Header';
import Cart from 'containers/Cart';
import Account from 'containers/Account';

import './assets/styles/app.scss';

// non-static routes
addPrefetchExcludes(['cart', 'account', 'account/shipping', 'account/payment']);

function App() {
	return (
		// @ts-ignore
		<ApolloProvider client={gqlClient}>
			<CartProvider>
				<CustomerProvider>
					<ShippingProvider>
						<Root>
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
									<Link to="/terms-of-service">Terms of Service</Link> 	
									<div className="footer-border"></div>
									<Link to="/privacy-and-policy">Privacy Policy</Link> 
								</div>
							</footer>
						</Root>
					</ShippingProvider>
				</CustomerProvider>
			</CartProvider>
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
