import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/formElements.scss';

class Test extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: {},
		};
	}

	selectOption() {
		console.log('selectOption');
	}

	render() {
		const { selectedCategory, data } = this.props;
		const categoryName = data.length && selectedCategory ? selectedCategory : 'Category is not selected...';
		return (
			<div className="form">
				<h1 className="form-title">{categoryName}</h1>
				<div className="form-row">
					<label htmlFor="f-number">Number of Questions:</label>
					<input type="text" className="text-input" id="f-number" placeholder="10" />
				</div>
			</div>
		);
	}
}

Test.propTypes = {
	data: PropTypes.array.isRequired,
	selectedCategory: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	data: state.test.data,
	selectedCategory: state.test.selectedCategory,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Test);