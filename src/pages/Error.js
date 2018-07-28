import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import '../styles/error.scss';
import { error } from '../content';

const Error = props => {
	const { data } = props;
	return (
		<div className="error">
			<h1 className="title">{`${Parser(data.cause)} (${data.status})`}</h1>
			<p className="error-message">{Parser(data.message)}</p>
			<div className="home-link">
				<Link to="/" className="link">{error.button}</Link>
			</div>
		</div>
	);
};

Error.propTypes = {
	data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	data: state.error.data,
});

export default connect(mapStateToProps, null)(Error);