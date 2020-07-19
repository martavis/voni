import React from 'react';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Router } from '@reach/router';
import Header from 'components/Header';
import Cart from 'containers/Cart';

import './assets/css/app.scss';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['cart']);

function App() {
	return (
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
		</Root>
	)
};

export default App;
