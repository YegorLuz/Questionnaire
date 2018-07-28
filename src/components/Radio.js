import React from 'react';
import PropTypes from 'prop-types';

class Radio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedValue: '',
		};

		this.onSelect = this.onSelect.bind(this);
		this.renderList = this.renderList.bind(this);
	}

	onSelect(event) {
		this.props.onSelect(event.target.value);
		this.setState({
			selectedValue: event.target.value,
		});
	}

	renderList() {
		const { name, values } = this.props;
		const { selectedValue } = this.state;
		return values.reduce((acc, value) => {
			acc.push(
				<label key={value}>
					<input type="radio" name={name} value={value} checked={selectedValue === value} />
					{value}
				</label>
			);
			return acc;
		}, []);
	}

	render() {
		return (
			<form onChange={this.onSelect}>
				{this.renderList()}
			</form>
		);
	}
}

Radio.propTypes = {
	name: PropTypes.string,
	values: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default Radio;