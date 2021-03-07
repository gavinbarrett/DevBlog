import * as React from 'react';
import './sass/Footer.scss';

export const Footer = () => {
	return (<footer>
		<div className="attributions">
			{`This blog is made with `}
			<p className="heart">{` \u2764 `}</p>
			{` and React`}
			<img src="./react-logo.png"/>
		</div>
	</footer>);
}
