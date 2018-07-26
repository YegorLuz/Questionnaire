import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/common.scss';
import '../styles/main.scss';
import '../styles/layout.scss';

class App extends React.Component {
	render() {
		const { location } = this.props;
		let title = '';

		switch(location.pathname) {
			case '/test': {
				title = 'Test';
				break;
			}
			default: {
				title = 'Home';
				break;
			}
		}

		return (
			<div>
				<Header title={title} />
				<main className="main">
					<div className="container">
						{this.props.children}
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default withRouter(App);