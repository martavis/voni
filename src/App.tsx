import React from 'react';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Link, Router } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';
import CartProvider from 'state/Cart';
import CustomerProvider from 'state/Customer';
import gqlClient  from 'utils/gqlClient';
import Header from 'components/Header';
import Cart from 'containers/Cart';
import Checkout from 'containers/Checkout';
import Profile from 'containers/Profile';

import './assets/styles/app.scss';

// non-static routes
addPrefetchExcludes(['cart', 'profile', 'profile/shipping', 'profile/payment', 'checkout', 'checkout/shipping', 'checkout/payment']);

function App() {
	return (
		// @ts-ignore
		<ApolloProvider client={gqlClient}>
			<CartProvider>
				<CustomerProvider>
					<Root>
						<Header />
						<div className="content">
							<React.Suspense fallback={<em>Loading...</em>}>
								<Router>
									<Cart path="cart" />
									<Checkout path="checkout"/>
									<Checkout path="checkout/shipping"/>
									<Checkout path="checkout/payment"/>
									<Profile path="profile"/>
									<Profile path="profile/shipping"/>
									<Profile path="profile/payment"/>
									<Routes default />
								</Router>
							</React.Suspense>
						</div>
						<footer>
							{new Date().getFullYear()} &trade; Voni Aesthetics - All Rights Reserved &nbsp;||&nbsp;<Link to="/contact"> Contact</Link> &nbsp;||&nbsp;<Link to="/terms-of-service"> Terms of Service</Link> 	
							&nbsp;||&nbsp;<Link to="/privacy-and-policy"> Privacy Policy</Link> 
						</footer>
					</Root>
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
