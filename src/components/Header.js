import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout.scss';
import '../styles/header.scss';

const Header = () => (
	<header className="header">
		<div className="container">
			<div className="logo-holder">
				<Link to="/">
					<img className="logo" src={require('../assets/logo.png')} alt="logo" />
				</Link>
			</div>
		</div>
	</header>
);

export default Header;