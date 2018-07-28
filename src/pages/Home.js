import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Selector from '../components/Selector';
import Input from '../components/Input';
import '../styles/formElements.scss';
import { home } from '../content';

import { init, getTestData } from '../actions';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: '10',
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
				<h1 className="form-title">{home.title}</h1>
				<div className="form-row">
					<label htmlFor="f-amount">{home.form.number.label}</label>
					<Input
						type="number"
						uid="amount"
						placeholder="10"
						value="10"
						onChange={this.onSelectOption}
					/>
				</div>
				<div className="form-row">
					<label htmlFor="f-category">{home.form.category.label}</label>
					<Selector
						uid="category"
						defaultOptionName={home.form.category.defaultValue}
						data={categories}
						onSelect={this.onSelectOption}
					/>
				</div>
				<div className="form-row">
					<label htmlFor="f-difficulty">{home.form.difficulty.label}</label>
					<Selector
						uid="difficulty"
						defaultOptionName={home.form.difficulty.defaultValue}
						data={difficulty}
						onSelect={this.onSelectOption}
					/>
				</div>
				<div className="form-row">
					<button
						className="button"
						onClick={this.requestTest}
					>
						{home.button}
					</button>
					<div className="clear" />
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