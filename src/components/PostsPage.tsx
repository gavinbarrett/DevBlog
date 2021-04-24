import * as React from 'react';
import * as Router from 'react-router-dom';
import { PostCard } from './PostCard';
import './sass/PostsPage.scss';

const NoPosts = () => {
	return (<div id="no-posts">
		<p>{"Couldn't find any posts."}</p>
	</div>);
}

const Waiting = () => {
	return (<div id="waiting">
		<p>{"Waiting for posts"}</p>
		<div id="svg-wrapper">
			<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
			  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
			</svg>
		</div>
	</div>);
}

export const PostsPage = ({query, posts, changePosts}) => {
	//const [posts, updatePosts] = React.useState([]);
	const loc = Router.useLocation();
	React.useEffect(() => {
		// FIXME:   if posts is not null, use that
		//			if posts is null, check query and use that
		//			if query is null or "", check url and use that
		//			if all else fails, display `no posts` component
		console.log(`Post: ${posts}\nQuery: ${query}`);
		if (!posts && !query)
			getAllPosts();	
		else if (!posts) {
			if (!query)
				getFromURL();
			else if (query)
				getFromQuery();
			else
				console.log("Couldn't get.");
		}
	}, []);

	const getFromQuery = async () => {
		if (query.match(/^([a-z0-9] ?)+$/i)) {
			const resp = await fetch(`/get_posts/${query}`);
			const r = await resp.json();
			if (r.rows !== "failed" && r.rows !== posts) {
				console.log("Resyncing posts.");
				changePosts(r.rows);
			}
			// FIXME: else update a different value to override waiting component.
		} else
			console.log("Can't fire query.");
	}

	const getFromURL = async () => {
		const args = loc.pathname.split("/");
		const q = args[args.length-1];
		if (q !== "posts" && q.match(/^([a-z0-9] ?)+$/i)) {
			const resp = await fetch(`/get_posts/${q}`);
			const r = await resp.json();
			if (r.rows !== "failed" && r.rows !== posts) {
				console.log("Resyncing posts.");
				changePosts(r.rows);
			}
			// FIXME: else update a different value to override waiting component.
		} else
			console.log("Can't fire query.");
	}
	const getAllPosts = async () => {
		const resp = await fetch('/get_all', {method: 'GET'});
		const r = await resp.json();
		if (r.rows !== "failed")
			changePosts(r.rows);
		// FIXME: else update a different value to override waiting component.
	}
	if (!posts) {
		return (<div className="posts-page">
			<Waiting/>
		</div>);
	} else if (posts && !posts.length) {
		return (<div className="posts-page">
			<NoPosts/>
		</div>);
	} else if (posts && posts.length) {
		return (<div className="posts-page">
			{posts.map((elem, idx) => {
				const date: Date = new Date(Date.parse(elem.post_time));
				return <PostCard title={elem.title} tags={elem.tags} hash={elem.hash} post_time={date.toLocaleString()}/>;
			})}
		</div>);
	}
}
