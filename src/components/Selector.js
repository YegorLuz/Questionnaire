import React from 'react';
import PropTypes from 'prop-types';

class Selector extends React.Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.getDefaultOption = this.getDefaultOption.bind(this);
		this.renderOptions = this.renderOptions.bind(this);
	}

	onChange(event) {
		const { uid } = this.props;
		const { target: { value = '' } } = event;
		this.props.onSelect(uid, value);
	}

	getDefaultOption() {
		const { defaultOptionName } = this.props;
		return <option value="any">{defaultOptionName}</option>;
	}

	renderOptions() {
		const { data } = this.props;
		return data.reduce((acc, item) => {
			acc.push(<option key={item.id} value={item.id}>{item.name}</option>);
			return acc;
		}, []);
	}

	render() {
		const { uid } = this.props;
		return (
			<select className="selector" id={`f-${uid}`} onChange={this.onChange}>
				{this.getDefaultOption()}
				{this.renderOptions()}
			</select>
		);
	}
}

Selector.defaultProps = {
	data: [],
	defaultOptionName: 'Default',
};

Selector.propTypes = {
	data: PropTypes.array,
	uid: PropTypes.string.isRequired,
	defaultOptionName: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
};

export default Selector;