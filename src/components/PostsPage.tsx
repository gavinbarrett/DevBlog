import * as React from 'react';
import { PostCard } from './PostCard';
import './sass/PostsPage.scss';

const Waiting = () => {
	return (<div class="waiting">
		<p>{"Waiting for posts."}</p>
	</div>);
}

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
			const date: Date = new Date(Date.parse(elem.post_time));
			return <PostCard title={elem.title} tags={elem.tags} hash={elem.hash} post_time={date.toLocaleString()}/>;
		}) : <Waiting/>}
	</div>);
}
