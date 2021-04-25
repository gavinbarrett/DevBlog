import * as React from 'react';
import * as Router from 'react-router-dom';
import { PostCard } from './PostCard';
import { Waiting } from './Waiting';
import './sass/LandingPage.scss';

export const LandingPage = ({changePosts, changeQuery}) => {
	const [recent, updateRecent] = React.useState([]);
	React.useEffect(() => {
		changePosts(null);
		changeQuery("");
		getRecentPosts()
	}, []);
	const getRecentPosts = async () => {
		const resp = await fetch('/get_recent', {method: 'GET'});
		const robj = await resp.json();
		if (robj.rows !== "failed")
			updateRecent(robj.rows);
	}
	return (<div className="landing-page">
		<div className="featured-home">
			<section className="landing-hook">
				<p>{"Welcome to my blog! This is a place for me to spill my musings on technology, politics, and philosophy."}</p>
			</section>
		</div>
		<div className="featured-posts">
			<div className="recent-posts">
				<div className="recent-title">{"Recent posts"}</div>
				<div className="post-array">
				{recent.length ? recent.map((elem, idx) => {
					const date: Date = new Date(Date.parse(elem.post_time));
					return <PostCard title={elem.title} tags={elem.tags} hash={elem.hash} post_time={date.toLocaleString()}/>
				}) : <Waiting/>}
				</div>
			</div>
			<div className="see-posts">
				<Router.Link to="/posts">All Posts</Router.Link>
			</div>
		</div>
		<div className="featured-about">
			<div className="about-text">
				<p>{"A b1t"}</p>
				<p>{"ab0ut me"}</p>
			</div>
			<div className="about-attributes">
				<section>I started hacking a few years ago, after realizing the threat posed by the pervasive existence of networked, data collecting devices.</section>
				<section>Nowadays I strive to clear the fog around technology and, through it, lead others to liberation instead of subjugation.</section>
			</div>
		</div>
	</div>);
}
