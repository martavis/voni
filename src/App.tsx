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
import {
	FaCcAmex,
	FaCcApplePay,
	FaCcDiscover,
	FaCcMastercard,
	FaCcVisa
} from 'react-icons/fa';

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
								transitionDuration={300}>
								<Header />
								<div className="content" id="content">
									<React.Suspense fallback={<em>Loading...</em>}>
										<ScrollToTop />
										<Router>
											<Cart path="cart" />
											<Account path="account" />
											<Account path="account/shipping" />
											<Account path="account/payment" />
											<Routes default />
										</Router>
									</React.Suspense>
								</div>
								<footer>
									{/* <div className="left">
										{new Date().getFullYear()} &trade;&nbsp;Voni Aesthetics - All Rights Reserved
									</div>
									<div className="right">
										<Link to="/about">About</Link>
										<div className="footer-border"></div>
										<Link to="/faqs">FAQs</Link>
										<div className="footer-border"></div>
										<Link to="/shipping">Shipping</Link>
										<div className="footer-border"></div>
										<Link to="/returns">Returns</Link>
										<div className="footer-border"></div>
										<Link to="/contact">Contact</Link>
										<div className="footer-border"></div>
										<Link to="/terms">Terms</Link>
										<div className="footer-border"></div>
										<Link to="/privacy">Privacy</Link>
									</div> */}
									<div className="top">
										<div className="section">
											<ul>
												<li>
													<Link to="/sizes">Size Guide</Link>
												</li>
												<li>
													<Link to="/about">About</Link>
												</li>
												<li>
													<Link to="/faqs">FAQs</Link>
												</li>
												<li>
													<Link to="/shipping">Shipping</Link>
												</li>
											</ul>
										</div>
										<div className="section">
											<ul>
												<li>
													<Link to="/returns">Returns</Link>
												</li>
												<li>
													<Link to="/terms">Terms</Link>
												</li>
												<li>
													<Link to="/privacy">Privacy</Link>
												</li>
											</ul>
										</div>
										<div className="section">
											<ul>
												<li>
													<Link to="/contact">Contact</Link>
												</li>
												<li>
													<a
														href="https://www.instagram.com/voniaesthetics/"
														target="_blank"
														rel="noreferrer noopener">
														Instagram
													</a>
												</li>
												<li>
													<a
														href="https://twitter.com/VoniAesthetics"
														target="_blank"
														rel="noreferrer noopener">
														Twitter
													</a>
												</li>
												<li>
													<a
														href="https://www.facebook.com/voniaesthetics"
														target="_blank"
														rel="noreferrer noopener">
														Facebook
													</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="bottom">
										<div className="inner">
											<div className="payments">
												<ul>
													<li>
														<FaCcAmex />
													</li>
													<li>
														<FaCcApplePay />
													</li>
													<li>
														<FaCcDiscover />
													</li>
													<li>
														<FaCcMastercard />
													</li>
													<li>
														<FaCcVisa />
													</li>
													<li>and more...</li>
												</ul>
											</div>
											<div className="rights">
												{new Date().getFullYear()} &trade;&nbsp;Voni Aesthetics - All Rights
												Reserved
											</div>
										</div>
									</div>
								</footer>
							</ToastProvider>
						</ShippingProvider>
					</CustomerProvider>
				</CartProvider>
			</Root>
		</ApolloProvider>
	);
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
