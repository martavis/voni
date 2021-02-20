import React from 'react';

import '../assets/styles/lookbook.scss';

export default () => {
	return (
		<div className="lookbook page">
			<section className="view-lookbook">
                <div className="view-lookbook-inner">
                    <iframe 
                        src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=hc9w9nnvxn" 
                        seamless={true} 
                        scrolling="no" 
                        frameBorder="0" allowFullScreen></iframe>
                </div>
			</section>
			<section className="download-lookbook">
                <a href="https://storage.googleapis.com/voni-assets/pdf/lookbook_v1.pdf" target="_blank" rel="noreferrer noopener">
                    <h1>Click to Download</h1>
                </a>
			</section>
		</div>
	);
};
