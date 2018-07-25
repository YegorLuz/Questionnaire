import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../store/index';
import App from './App';

const AppContainer = props => (
	<Provider store={store}>
		<App>
			{props.children}
		</App>
	</Provider>
);

AppContainer.propTypes = {
	children: PropTypes.object.isRequired,
};

AppContainer.defaultProps = {
	children: {},
};

export default AppContainer;