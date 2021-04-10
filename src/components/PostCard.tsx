import * as React from 'react';
import * as Router from 'react-router-dom';
import './sass/PostCard.scss';

type postCard = {
	title: string,
	tags: string,
	hash: string,
	post_time: string,
};

export const PostCard = ({title, tags, hash, post_time}:postCard) => {
	const [history, updateHistory] = React.useState(Router.useHistory());
	const [splitTags, updateSplitTags] = React.useState([]);
	React.useState(() => {
		const split = tags.split(",");
		const filtered = split.reduce((res, elem) => {
			if (elem != "")
				return [...res, elem.trim()];
			return [...res];
		}, []);
		updateSplitTags(filtered);
	}, []);
	const getDigest = () => {
		history.push(`/post/${hash}`);
	}
	return (<div className="post-card" onClick={getDigest}>
		<p className="post-title">{title}</p>
		<div className="metadata">
			<div id="tag-box">
				{splitTags.length ? splitTags.map(elem => {
					return <p className="post-tags">{elem}</p>
				})
				: ''}
			</div>
			<p className="post-time">{`Posted on ${post_time}`}</p>
		</div>
	</div>);
}
