import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { PostsPage } from './components/PostsPage';
import { Post } from './components/Post';
import { AboutPage } from './components/AboutPage';
import { PageNotFound } from './components/PageNotFound';
import { Footer } from './components/Footer';
import './components/sass/App.scss';

const App = () => {
	const [postHash, changePostHash] = React.useState('');
	return (<div className="app-container">
	<Header/>
		<Router.Switch>
			<Router.Route path={`/`} exact render={() => <LandingPage/>}/>
			<Router.Route path={`/posts`} render={() => <PostsPage/>}/>
			<Router.Route path={`/post/${postHash}`} render={() => <Post/>}/>
			<Router.Route path={`/about`} render={() => <AboutPage/>}/>
			<Router.Route path={`*`} render={() => <PageNotFound/>}/>
		</Router.Switch>
	<Footer/>
	</div>);
}

ReactDOM.render(<Router.HashRouter><App/></Router.HashRouter>, document.getElementById("root"));
