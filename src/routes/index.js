import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import ScreenLoader from '../components/ScreenLoader';
import AppContainer from '../containers';

const LoadableComponent = path => Loadable({
	loader: () => import(`../pages/${path}`),
	loading: ScreenLoader,
	render (loaded, props) {
		const Comp = loaded.default;
		return <Comp {...props} />;
	},
});

export default (
	<BrowserRouter>
		<AppContainer>
			<Switch>
				<Route path={'/'} exact component={LoadableComponent('Home')} />
				<Route component={LoadableComponent('PageNotFound')} />
			</Switch>
		</AppContainer>
	</BrowserRouter>
);