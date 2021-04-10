import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { PostsPage } from './components/PostsPage';
import { Post } from './components/Post';
import { AboutPage } from './components/AboutPage';
import { PageNotFound } from './components/PageNotFound';
import { Footer } from './components/Footer';
import './components/sass/App.scss';

const App = () => {
	const [query, changeQuery] = React.useState('');
	const [postHash, changePostHash] = React.useState('');
	const [posts, changePosts] = React.useState(null);
	const reference = React.createRef();
	return (<><ScrollToTop/>
	<div className="app-container">
	<Header reference={reference} changeQuery={changeQuery} posts={posts} changePosts={changePosts}/>
		<Router.Switch>
			<Router.Route path={`/`} exact render={() => <LandingPage changePosts={changePosts} changeQuery={changeQuery}/>}/>
			<Router.Route path={`/posts`} render={() => <PostsPage query={null} posts={posts} changePosts={changePosts}/>}/>
			<Router.Route path={`/search/*`} render={() => <PostsPage query={query} posts={posts} changePosts={changePosts}/>}/>
			<Router.Route path={`/post/${postHash}`} render={() => <Post/>}/>
			<Router.Route path={`/about`} render={() => <AboutPage/>}/>
			<Router.Route path={`*`} render={() => <PageNotFound/>}/>
		</Router.Switch>
	<Footer reference={reference}/>
	</div></>);
}

ReactDOM.render(<Router.HashRouter><App/></Router.HashRouter>, document.getElementById("root"));
