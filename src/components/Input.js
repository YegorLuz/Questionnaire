import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
		};

		this.value = '';
		this.input = null;

		this.onRef = this.onRef.bind(this);
		this.onChange = this.onChange.bind(this);
		this.receiveValue = this.receiveValue.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.receiveValue);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.receiveValue);
	}

	onRef(node) {
		this.input = node;
	}

	onChange(event) {
		const { target: { value = '' } } = event;
		this.setState({
			value,
		});
	}

	receiveValue(event) {
		const { uid } = this.props;
		const { value } = this.state;

		if (
			(!this.input || !this.input.contains(event.target))
			&& this.value !== value
		) {
			this.props.onChange(uid, value);
			this.value = value;
		}
	}

	render() {
		const { type, uid, placeholder } = this.props;
		const { value } = this.state;

		return (
			<input
				ref={this.onRef}
				type={type}
				className="input"
				id={`f-${uid}`}
				placeholder={placeholder}
				value={value}
				onChange={this.onChange}
			/>
		);
	}
}

Input.defaultProps = {
	type: 'text',
	value: '',
	placeholder: '',
};

Input.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	uid: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default Input;