import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { PostsPage } from './components/PostsPage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import './components/sass/App.scss';

const App = () => {
	return (<div className="app-container">
	<Header/>
		<Router.Switch>
			<Router.Route path="/" exact render={() => <LandingPage/>}/>
			<Router.Route path="/posts" exact render={() => <PostsPage/>}/>
			<Router.Route path="/about" exact render={() => <AboutPage/>}/>
		</Router.Switch>
	<Footer/>
	</div>);
}

ReactDOM.render(<Router.HashRouter><App/></Router.HashRouter>, document.getElementById("root"));
