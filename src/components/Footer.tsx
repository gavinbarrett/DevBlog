import * as React from 'react';
import './sass/Footer.scss';

export const Footer = ({reference}) => {

	const scrollToTop = event => {
		event.preventDefault();
		console.log('Scrolling');
		reference.current.scrollIntoView({behavior: 'smooth', block: 'end'});
	}

	return (<footer>
		<div className="attributions">
			{`gtech 2021 \u00A9`}
		</div>
		<div className="attributions">
			{`Made with `}
			<p className="heart">{` \u2764 `}</p>
			{` and React`}
			<img src="./react-logo.png"/>
		</div>
		<div className="attributions to-top" onClick={scrollToTop}>
			{"Back to top"}
		</div>
	</footer>);
}
