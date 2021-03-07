import * as React from 'react';
import './sass/PostsPage.scss';

export const PostsPage = () => {
	const [posts, updatePosts] = React.useState([]);

	React.useEffect(() => {
		getAllPosts();
	}, []);

	const getAllPosts = async () => {
		const resp = await fetch('/get_all', {method: 'GET'});
		const r = await resp.json();
		updatePosts(r.rows);
	}

	return (<div className="posts-page">
		{posts.length ? posts.map((elem, idx) => {
			return <p>{elem.title}</p>;
		}) : "Couldn't load posts."}
	</div>);
}
