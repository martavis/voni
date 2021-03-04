import React, { useState, useEffect, createRef } from 'react';
import { useRouteData, Head } from 'react-static';
import { ProductEdge, ProductConnection } from 'shopify-storefront-api-typings';

import '../assets/styles/index.scss';

import ProductComponent from 'components/Product';
import { Link } from '@reach/router';

export default () => {
	const [imageNum] = useState(1);
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const videoRef = createRef<HTMLVideoElement>();

	const { products }: { products: ProductConnection } = useRouteData();
	// useEffect(() => {
	// 	['pause', 'ended'].forEach(evt => 
	// 		videoRef.current.addEventListener(evt, () => {
	// 			setIsVideoPlaying(false);
	// 		}, false)
	// 	);

	// 	videoRef.current.addEventListener('playing', () => {
	// 		setIsVideoPlaying(true);
	// 	}, false)
	// }, []);

	// useEffect(() => {
	// 	if (isVideoPlaying) {
	// 		(videoRef.current.paused || videoRef.current.ended) && videoRef.current.play();
	// 		videoRef.current.controls = true;
	// 	} else {
	// 		videoRef.current.controls = false;
	// 	}
	// }, [isVideoPlaying]);

	return (
		<div className="home page">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Voni Aesthetics</title>
				<meta
					name="description"
					content="The apparel line of the future is here. Astro Collection available now for purchase."
				/>
				<meta name="keywords" content="Voni, Aesthetics, clothing, apparel, fashion, accessories"></meta>
				<meta property="og:title" content="Voni Aesthetics" />
				<meta
					property="og:description"
					content="The apparel line of the future is here. Astro Collection available now for purchase."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://voni.us" />
				<meta
					property="og:image"
					content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://storage.googleapis.com/voni-assets/img/metadata/social_image.png"
				/>
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="1366" />
				<meta property="og:image:height" content="768" />
				<meta property="og:image:alt" content="Voni Aesthetics" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/favicon-16x16.png"
				/>
				<link
					rel="manifest"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/site.webmanifest"
				/>
				<link
					rel="mask-icon"
					href="https://storage.googleapis.com/voni-assets/img/metadata/favicons/safari-pinned-tab.svg"
					color="#3a551a"
				/>
				<meta name="msapplication-TileColor" content="#00a300" />
				<meta name="theme-color" content="#ffffff"></meta>
			</Head>
			<section className="welcome">
				{/* <div className="model-roll">
					<img
						alt=""
						src={`https://storage.googleapis.com/voni-assets/img/welcome-models/model-${imageNum}.png`}
					/>
				</div> */}
				<div className="welcome-message">
					<h1>
						Your Future&nbsp;
						{/* <br /> */}
						is Here
					</h1>
					<p>Astro Collection available now for purchase.</p>
					<a href="#products">Shop Now</a>
				</div>
			</section>
			<section className="lookbook">
				<div className="video-wrapper">
					<div className="video">
						<img
							className="border"
							alt=""
							src="https://storage.googleapis.com/voni-assets/img/video-frame.svg"
						/>
						<video controls width="288" height="512" preload="metadata" playsInline>
							<source
								src="https://storage.googleapis.com/voni-assets/videos/voni_ad.mp4"
								type="video/mp4"
							/>
							<source
								src="https://storage.googleapis.com/voni-assets/videos/voni_ad.mov"
								type="video/mp4"
							/>
							Your browser does not support the video tag.
						</video>
						{/* <video ref={videoRef} width="288" height="512" preload="metadata" playsInline>
							<source
								src="https://storage.googleapis.com/voni-assets/videos/voni_ad.mp4"
								type="video/mp4"
							/>
							Your browser does not support the video tag.
						</video>
						<div
							className="video-overlay"
							data-playing={isVideoPlaying}
							onClick={() => setIsVideoPlaying(true)}>
							<img alt="play" src="https://storage.googleapis.com/voni-assets/img/video-play-green.svg" />
						</div> */}
					</div>
				</div>
				<div className="pdf-wrapper">
					<Link to="/lookbook">
						<h1>Lookbook</h1>
						<h3>Click to View</h3>
					</Link>
				</div>
			</section>
			<section className="featured-items">
				<h2 id="products">Astro Collection</h2>
				<div className="item-grid section-custom-border">
					{products &&
						products.edges.map((product: ProductEdge, i: number) => (
							<ProductComponent key={i} product={product.node} />
						))}
				</div>
			</section>
		</div>
	);
};
