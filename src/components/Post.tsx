import * as React from 'react';
import * as Router from 'react-router-dom';

export const Post = () => {
	const [loc, updateLoc] = React.useState(Router.useLocation());

	React.useEffect(() => {
		getPost()
	}, []);

	const getPost = async () => {
		const digest = loc.pathname.split("/")[2];
		// FIXME: check digest
		console.log(digest);
	}

	return (<div>
		{"post"}
	</div>);
}
