import React from 'react';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Router } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';
import CartProvider from 'state/Cart';
import gqlClient from './gqlClient';
import Header from 'components/Header';
import Cart from 'containers/Cart';

import './assets/styles/app.scss';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['cart']);

function App() {
	return (
		// @ts-ignore
		<ApolloProvider client={gqlClient}>
			<CartProvider>
				<Root>
					<Header />
					<div className="content">
						<React.Suspense fallback={<em>Loading...</em>}>
							<Router>
								<Cart path="cart" />
								<Routes default />
							</Router>
						</React.Suspense>
					</div>
					<footer>
						<p>{new Date().getFullYear()} &trade; Voni Aesthetics - All Rights Reserved</p>
					</footer>
				</Root>
			</CartProvider>
		</ApolloProvider>
	)
};

export default App;
