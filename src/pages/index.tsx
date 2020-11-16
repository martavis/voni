import React, { useState, useEffect, createRef } from 'react';
import { useRouteData } from 'react-static';
import { Link } from '@reach/router';
import { Collection, Product } from 'types/vendure';

import '../assets/styles/home.scss';

import ProductComponent from 'components/Product';

export default () => {
	const [imageNum] = useState(1);
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const videoRef = createRef<HTMLVideoElement>();

	const { collection }: { collection: Collection } = useRouteData();
	
	useEffect(() => {
		['pause', 'ended'].forEach(evt => 
			videoRef.current.addEventListener(evt, () => {
				setIsVideoPlaying(false);
			}, false)
		);

		videoRef.current.addEventListener('playing', () => {
			setIsVideoPlaying(true);
		}, false)
	}, []);

	useEffect(() => {
		if (isVideoPlaying) {
			(videoRef.current.paused || videoRef.current.ended) && videoRef.current.play();
			videoRef.current.controls = true;
		} else {
			videoRef.current.controls = false;
		}
	}, [isVideoPlaying]);

	return (
		<div className="home page">
			<section className="welcome">
				<div className="model-roll">
					${imageNum}
					{/* <img alt="" src={`https://storage.googleapis.com/voni-assets/img/welcome-models/model-${imageNum}.png`} /> */}
				</div>
				<div className="welcome-message">
					<h1><span>Say Hello,</span><br />To The Future</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean<br />congue cursus efficitur. Pellentesque odio tortor, suscipit nec tortor ut.
					</p>
					<Link to="/shop">Shop Now</Link>
				</div>
			</section>
			<section className="lookbook">
				<div className="video-wrapper">
					<div className="video">
						<video ref={videoRef} width="400" height="288">
							<source src="https://storage.googleapis.com/voni-assets/videos/voni-ad.mp4?t=sdk" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
						<div className="video-overlay" data-playing={isVideoPlaying} onClick={() => setIsVideoPlaying(true)}>
							<img alt="play" src="https://storage.googleapis.com/voni-assets/img/video-play.svg" />
						</div>
					</div>
				</div>
				<div className="pdf-wrapper">
					<a target="_blank" href="https://storage.googleapis.com/voni-assets/pdf/lookbook.pdf">
						<h1>Lookbook</h1>
						<h3>Download Now!</h3>
					</a>
				</div>
			</section>
			<section className="featured-items">
				<h2>New Arrivals</h2>
				<div className="item-grid section-custom-border">{
					collection && collection.productVariants.items.map(({ product }: { product: Product }, i: number) => (
						<ProductComponent key={i} product={product} />
					))
				}</div>
			</section>
		</div>
	);
};
