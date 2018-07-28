import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import Radio from './Radio';

class Question extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};

		this.onSelect = this.onSelect.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSelect(value) {
		this.setState({
			value,
		});
	}

	onSubmit() {
		const { data } = this.props;
		const { value } = this.state;
		if (!!value) {
			const passed = value === data.correct_answer;
			this.props.onResult(passed);
		}
	}

	render() {
		const { data } = this.props;
		const { question = '', incorrect_answers = [], correct_answer = '' } = data;
		return (
			<div className="question">
				<div className="question-row">
					<p>{Parser(question)}</p>
					<Radio
						values={[...incorrect_answers, correct_answer].sort()}
						onSelect={this.onSelect}
					/>
				</div>
				<div className="question-row -no-border">
					<button
						className="button"
						onClick={this.onSubmit}
					>
						Submit
					</button>
					<div className="clear" />
				</div>
			</div>
		);
	}
}

Question.propTypes = {
	data: PropTypes.object.isRequired,
	onResult: PropTypes.func.isRequired,
};

export default Question;