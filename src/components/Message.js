import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { testResults } from '../content';

class Message extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
		};

		this.onClose = this.onClose.bind(this);
		this.toggleAnimation = this.toggleAnimation.bind(this);

		setTimeout(this.onClose, 1200);
		setTimeout(this.toggleAnimation, 900);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				show: true,
			});
		}, 10);
	}

	onClose() {
		this.props.onClose();
	}

	toggleAnimation() {
		this.setState({
			show: false,
		});
	}

	render() {
		const { passed } = this.props;
		const { show } = this.state;
		return <div className={classNames('message', { '-show': show }, { success: passed }, { fail: !passed })}>{passed ? testResults.answers.ok : testResults.answers.wrong}</div>;
	}
}

Message.defaultProps = {
	passed: false,
};

Message.propTypes = {
	passed: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
};

export default Message;