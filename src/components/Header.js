import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/layout.scss';
import '../styles/header.scss';

const Header = props => {
	const { title } = props;
	return (
		<header className="header">
			<div className="container">
				<div className="logo-holder">
					<Link to="/">
						<img className="logo" src={require('../assets/logo.png')} alt="logo" />
					</Link>
				</div>
				<div className="page-title">{title}</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Header;