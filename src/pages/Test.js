import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import Question from '../components/Question';
import Message from '../components/Message';
import '../styles/formElements.scss';
import { test } from '../content';

import { getProgress, saveAnswer } from '../actions';

class Test extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showMessage: false,
		};

		this.onSelectOption = this.onSelectOption.bind(this);
		this.onHideMessage = this.onHideMessage.bind(this);
		this.renderQuestion = this.renderQuestion.bind(this);

		if (!props.data.length) {
			props.getProgress();
		}
	}

	onSelectOption(passed) {
		const { data, answers, history } = this.props;
		this.props.saveAnswer(passed);
		this.setState({
			showMessage: true,
		});

		if (data.length === answers.length + 1) {
			history.push('test-results');
		}
	}

	onHideMessage() {
		this.setState({
			showMessage: false,
		});
	}

	renderQuestion() {
		const { data, answers } = this.props;
		const questionData = data[answers.length];
		if (questionData) {
			return <Question key={answers.length} data={questionData} onResult={this.onSelectOption}/>;
		}

		return null;
	}

	render() {
		const { category, data, answers } = this.props;
		const { showMessage } = this.state;
		const categoryName = data.length && category ? category : test.defaultTitle;
		return (
			<div className="form">
				<h1 className="form-title">{Parser(categoryName)}</h1>
				{this.renderQuestion()}
				{showMessage ? <Message passed={answers[answers.length - 1]} onClose={this.onHideMessage} /> : null}
			</div>
		);
	}
}

Test.propTypes = {
	data: PropTypes.array.isRequired,
	answers: PropTypes.array.isRequired,
	category: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	data: state.test.data,
	answers: state.test.answers,
	category: state.test.category,
});

const mapDispatchToProps = {
	getProgress,
	saveAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);