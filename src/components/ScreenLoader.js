import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ScreenLoader = props => {
	const { loading } = props;

	if (loading) {
		return (
			<div className="screen-loader">Loading...</div>
		);
	}

	return null;
};

ScreenLoader.propTypes = {
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	loading: state.screenLoader.loading,
});

export default connect(mapStateToProps, null)(ScreenLoader);