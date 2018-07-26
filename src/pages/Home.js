import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Selector from '../components/Selector';
import Input from '../components/Input';
import '../styles/formElements.scss';

import { init, getTestData } from '../actions';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: '0',
			category: '0',
			difficulty: '',
		};

		props.init();

		this.requestTest = this.requestTest.bind(this);
		this.onSelectOption = this.onSelectOption.bind(this);
	}

	requestTest() {
		const { history, getTestData, categories } = this.props;
		const { category } = this.state;
		const categoryName = (categories.filter(cat => cat.id === parseInt(category, 10))[0] || {}).name || '';
		getTestData(this.state, categoryName).then(() => {
			history.push('/test');
		});
	}

	onSelectOption(uid, value) {
		this.setState({
			[uid]: value,
		});
	}

	render() {
		const { categories, difficulty } = this.props;
		return (
			<div className="form">
				<h1 className="form-title">Questions Selector</h1>
				<div className="form-row">
					<label htmlFor="f-amount">Number of Questions:</label>
					<Input
						type="number"
						uid="amount"
						placeholder="10"
						onChange={this.onSelectOption}
					/>
				</div>
				<div className="form-row">
					<label htmlFor="f-category">Select Category:</label>
					<Selector
						uid="category"
						defaultOptionName="Any Category"
						data={categories}
						onSelect={this.onSelectOption}
					/>
				</div>
				<div className="form-row">
					<label htmlFor="f-difficulty">Select Difficulty:</label>
					<Selector
						uid="difficulty"
						defaultOptionName="Any Difficulty"
						data={difficulty}
						onSelect={this.onSelectOption}
					/>
				</div>
				<div className="form-row">
					<button
						className="button"
						onClick={this.requestTest}
					>
						generate test
					</button>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.object).isRequired,
	difficulty: PropTypes.arrayOf(PropTypes.object).isRequired,
	init: PropTypes.func.isRequired,
	getTestData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	categories: state.home.categories,
	difficulty: state.home.difficulty,
});

const mapDispatchToProps = {
	init,
	getTestData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);