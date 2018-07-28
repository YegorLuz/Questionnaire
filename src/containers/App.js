import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/common.scss';
import '../styles/main.scss';
import '../styles/layout.scss';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.redirect = this.redirect.bind(this);
	}

	componentDidMount () {
		this.redirect();
	}

	componentDidUpdate() {
		this.redirect();
	}

	redirect() {
		const { error, history } = this.props;
		const { location: { pathname } } = history;
		const errorExists = Object.keys(error).length > 0;
		if (errorExists && pathname !== '/error') {
			history.push('error');
		} else if (!errorExists && pathname === '/error') {
			history.push('/');
		}
	}

	render() {
		return (
			<div>
				<Header/>
				<main className="main">
					<div className="container">
						{this.props.children}
					</div>
				</main>
				<Footer/>
			</div>
		);
	}
}

App.defaultProps = {
	error: {},
};

App.propTypes = {
	error: PropTypes.object,
};

const mapStateToProps = state => ({
	error: state.error.data,
});

export default withRouter(connect(mapStateToProps, null)(App));