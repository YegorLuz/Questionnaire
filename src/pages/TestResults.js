import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import classNames from 'classnames';
import '../styles/formElements.scss';
import { testResults } from '../content';

import { getProgress, clearAnswers } from '../actions';

class TestResults extends React.Component {
	constructor(props) {
		super(props);

		this.goToMain = this.goToMain.bind(this);
		this.repeatTest = this.repeatTest.bind(this);
		this.renderList = this.renderList.bind(this);
		this.renderRepeatButton = this.renderRepeatButton.bind(this);

		if (!props.data.length) {
			props.getProgress();
		}
	}

	goToMain() {
		const { history } = this.props;
		history.push('/');
	}

	repeatTest() {
		const { history } = this.props;
		this.props.clearAnswers();
		history.goBack();
	}

	renderList() {
		const { data, answers } = this.props;
		if (data.length && answers.length) {
			return data.reduce((acc, { question }, index) => {
				acc.push(
					<div key={question} className="question">
						<div className="question-row">
							<p>{Parser(question)}</p>
							<p className={classNames('answer', { ok: answers[index] }, { wrong: !answers[index] })}>{answers[index] ? testResults.answers.ok : testResults.answers.wrong}</p>
						</div>
					</div>
				);
				return acc;
			}, []);
		}

		return null;
	}

	renderRepeatButton() {
		const { data, category } = this.props;
		if (data.length && category) {
			return (
				<button
					className="button"
					onClick={this.repeatTest}
				>
					{testResults.buttons.repeat}
				</button>
			);
		}

		return null;
	}

	render() {
		const { data, answers, category } = this.props;
		const hasTest = data.length && category;
		const categoryName = hasTest ? category : testResults.defaultTitle;
		const values = hasTest ? ` (${answers.filter(val => val).length} ${testResults.results} ${data.length})` : '';
		return (
			<div className="form">
				<h1 className="form-title">{`${categoryName}${values}`}</h1>
				{this.renderList()}
				<div className="question-row -no-border">
					{this.renderRepeatButton()}
					<button
						className="button info"
						onClick={this.goToMain}
					>
						{testResults.buttons.another}
					</button>
					<div className="clear" />
				</div>
			</div>
		);
	}
}

TestResults.propTypes = {
	data: PropTypes.array.isRequired,
	answers: PropTypes.array.isRequired,
	category: PropTypes.string.isRequired,
	getProgress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.test,
});

const mapDispatchToProps = {
	getProgress,
	clearAnswers,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestResults);