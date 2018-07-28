import React from 'react';
import '../styles/layout.scss';
import '../styles/footer.scss';
import { footer } from '../content';

const Footer = () => (
	<footer className="footer">
		<div className="container">
			<div className="copyrights">{footer.copyrights}</div>
		</div>
	</footer>
);

export default Footer;