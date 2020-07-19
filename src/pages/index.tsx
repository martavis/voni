import React, { useState } from 'react';
import { Link } from '@reach/router';

import '../assets/css/home.scss';

export default () => {
	const [imageNum] = useState(1);

	return (
		<div className="home page">
			<section className="welcome">
				<div className="model-roll">
					<img alt="" src={`https://storage.googleapis.com/voni-assets/img/welcome-models/model-${imageNum}.png?t=3232`} />
				</div>
				<div className="welcome-message">
					<h1><span>Say Hello,</span><br />To The Future</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean<br />congue cursus efficitur. Pellentesque odio tortor, suscipit nec tortor ut.
					</p>
					<Link to="/shop">Shop Now</Link>
				</div>
			</section>
		</div>
	);
};
