import * as React from 'react';
import * as Router from 'react-router-dom';
import './sass/Header.scss';

export const Header = () => {
	return (<header>
		<div className="title">{"Gavin's Tech Blog"}</div>
		<nav>
			<Router.Link to="/">Home</Router.Link>
			<Router.Link to="/posts">Posts</Router.Link>
			<Router.Link to="/about">About</Router.Link>
		</nav>
	</header>);
}
