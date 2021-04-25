import * as React from 'react';
import * as Router from 'react-router-dom';
import './sass/Header.scss';

export const Header = ({reference, changeQuery, posts, changePosts}) => {
	const hist = Router.useHistory();
	const ref = React.createRef();
	const search = <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
	  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
	  <circle cx="10" cy="10" r="7" />
	  <line x1="21" y1="21" x2="15" y2="15" />
	</svg>
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
		<div className="input-box">
			<div id="search-box">
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" viewBox="0 0 24 24" stroke-width="1.5" stroke="#106958" fill="none" stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="10" cy="10" r="7" />
				  <line x1="21" y1="21" x2="15" y2="15" />
				</svg>
			</div>
			<input ref={ref} placeholder="Search for posts" onChange={updateQuery}/>
		</div>
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
