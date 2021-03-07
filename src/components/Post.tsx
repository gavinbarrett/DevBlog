import * as React from 'react';
import * as Router from 'react-router-dom';
import './sass/Post.scss';

export const Post = () => {
	const [loc, updateLoc] = React.useState(Router.useLocation());

	React.useEffect(() => {
		getPost()
	}, []);

	const getPost = async () => {
		// extract 
		const digest = loc.pathname.split("/")[2];
		//
		if (!validDigest(digest)) return;
		//
		const resp = await fetch(`/get_post/?digest=${digest}`, {method: "GET"});
		const r = await resp.json();
		console.log(r);
	}

	const validDigest = digest => {
		return digest.match(/^[0-9a-f]{64}$/);
	}

	return (<div className="displayed-post">
		{"post"}
	</div>);
}
