import * as React from 'react';
import * as Router from 'react-router-dom';
import './sass/Header.scss';

export const Header = ({reference, changeQuery, posts, changePosts}) => {
	const hist = Router.useHistory();
	const ref = React.createRef();
	const updateQuery = async event => {
		if (event.target.value == "") {
			changePosts([]);
			changeQuery("");
			hist.push("/");
		} else if (event.target.value.match(/^([a-z0-9] ?)+$/i)) {
			const resp = await fetch(`/get_posts/${event.target.value}`);
			const r = await resp.json();
			console.table(`Rows: ${JSON.stringify(r.rows)}\nPosts: ${JSON.stringify(posts)}`);
			if (JSON.stringify(r.rows) == JSON.stringify(posts))
				console.log("Posts synced.");
			else if (r.rows !== "failed" && r.rows.length != 0) {
				console.log("Found some posts");
				console.log(`Rows retrieved: ${JSON.stringify(r.rows)}`);
				changePosts(r.rows);
				hist.push(`/search/${event.target.value}`);
			} else {
				changePosts([]);
				console.log("No rows found");
			}
			changeQuery(event.target.value);
			console.log(r);
		} else {
			// FIXME: indicate to the user that the query is not valid
			console.log("Can't fire query.");
		}
	}
	return (<header id="header" ref={reference}>
		<Router.Link to="/" title="Return to Home" className="title" onClick={() => {
			ref.current.value = "";
			changeQuery(null);
		}}>
			{"/blog/urandom"}
		</Router.Link>
		<input ref={ref} placeholder="Search for posts" onChange={updateQuery}/>
		<nav>
			<Router.Link to="/" onClick={() => {
				ref.current.value = "";
				changeQuery(null)
			}}>
				{"Home"}
				<hr></hr>
			</Router.Link>
			<Router.Link to="/posts" onClick={async () => {
				ref.current.value = "";
				changePosts(null);
				changeQuery("")
			}}>
				{"Posts"}
				<hr></hr>
			</Router.Link>
			{/*<Router.Link to="/about">{"About"}</Router.Link>*/}
		</nav>
	</header>);
}
