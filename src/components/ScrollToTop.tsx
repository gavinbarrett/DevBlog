import * as React from 'react';
import * as Router from 'react-router-dom';

export const ScrollToTop = () => {
	const { pathname } = Router.useLocation();
	console.log(pathname);
	React.useEffect(() => {
		document.getElementById("header").scrollIntoView();
	}, [pathname]);
	return null;
}
