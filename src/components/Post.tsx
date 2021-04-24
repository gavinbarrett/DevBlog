import * as React from 'react';
import * as Router from 'react-router-dom';
import { Waiting } from './Waiting';
import './sass/Post.scss';

export const Post = () => {
	const [loc, updateLoc] = React.useState(Router.useLocation());
	const [postContent, updatePostContent] = React.useState();
	React.useEffect(() => {
			getPost();
	}, []);
	const pad = (char) => {
		if (char.length == 1)
			return '0' + char;
		return char;
	}
	const hashFile = async post => {
		const buffer = new Uint8Array(Array.from([...post], char => char.charCodeAt(0)));
		// compute sha256 hash
		const compDigest = await crypto.subtle.digest('SHA-256', buffer);
		// convert to hex string
		const intarr = new Uint8Array(compDigest);
		const strdigest = String.fromCharCode(...intarr);
		return strdigest.split("").map(c => pad(c.charCodeAt(0).toString(16))).join("");
	}
	const getPost = async () => {
		// extract hash
		const digest = loc.pathname.split("/")[2];
		// check for valid 256 bit hash
		if (!validDigest(digest)) return;
		// retrieve post
		const resp = await fetch(`/get_post/?digest=${digest}`, {method: "GET"});
		const r = await resp.json();
		if (r.posts !== "failed") {
			const post = atob(r.post);
			// compute sha256 digest of the html
			const hexdigest = await hashFile(post);
			// decode base64
			if (digest == hexdigest) {
				console.log("Post integrity check complete.");
				updatePostContent(post);
			}
		}
	}
	const validDigest = digest => {
		return digest.match(/^[0-9a-f]{64}$/);
	}
	return (<div className="displayed-post">
		{postContent ? <div id="container" dangerouslySetInnerHTML={{__html: postContent}}/> : <Waiting/>}
	</div>);
}
