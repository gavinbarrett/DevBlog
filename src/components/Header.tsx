import * as React from 'react';
import * as Router from 'react-router-dom';
import './sass/Header.scss';

export const Header = ({reference}) => {
	return (<header id="header" ref={reference}>
		<Router.Link to="/" title="Return to Home" className="title">{"gtech.blog"}</Router.Link>
		<nav>
			<Router.Link to="/">{"Home"}</Router.Link>
			<Router.Link to="/posts">{"Posts"}</Router.Link>
			{/*<Router.Link to="/about">{"About"}</Router.Link>*/}
		</nav>
	</header>);
}
