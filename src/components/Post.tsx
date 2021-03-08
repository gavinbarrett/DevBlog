import * as React from 'react';
import * as Router from 'react-router-dom';
import './sass/Post.scss';

export const Post = () => {
	const [loc, updateLoc] = React.useState(Router.useLocation());
	const [postContent, updatePostContent] = React.useState();

	React.useEffect(() => {
		getPost()
	}, []);

	const getPost = async () => {
		// extract hash
		const digest = loc.pathname.split("/")[2];
		// check for valid 256 bit hash
		if (!validDigest(digest)) return;
		// retrieve post
		const resp = await fetch(`/get_post/?digest=${digest}`, {method: "GET"});
		const r = await resp.json();
		// decode base64
		const post = atob(r.post);
		console.log(post);
		updatePostContent(post);
	}

	const validDigest = digest => {
		return digest.match(/^[0-9a-f]{64}$/);
	}

	return (<div className="displayed-post">
		{postContent ? <div id="container" dangerouslySetInnerHTML={{__html: postContent}}/> : "Could not retrieve post."}
	</div>);
}
