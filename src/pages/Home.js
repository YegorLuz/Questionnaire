import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { init } from '../actions';

class Home extends React.Component {
	constructor(props) {
		super(props);

		props.init();

		this.renderList = this.renderList.bind(this);
	}

	renderList() {
		const { data } = this.props;
		return data.reduce((acc, item) => {
			acc.push(<p key={item.id}>{item.name}</p>);
			return acc;
		}, []);
	}

	render() {
		return (
			<div>
				{this.renderList()}
			</div>
		);
	}
}

Home.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
	data: state.home.data,
});

const mapDispatchToProps = { init };

export default connect(mapStateToProps, mapDispatchToProps)(Home);