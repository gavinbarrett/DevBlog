import * as React from 'react';
import * as Router from 'react-router-dom';
import './sass/LandingPage.scss';

export const LandingPage = () => {
	return (<div className="landing-page">
		<div className="featured-home">
			<section className="landing-hook">
				{"Welcome to my blog! This is a place for me to spill my musings on technology, politics, and philosophy."}
			</section>
		</div>
		<div className="featured-posts">
			<div className="recent-posts">
				{"Recent Posts"}
			</div>
			<div className="see-posts">
				<Router.Link to="/posts">See Posts</Router.Link>
			</div>
		</div>
		<div className="featured-about">

		</div>
	</div>);
}
