import { TEST, SUCCESS, FAIL, CATEGORY, ANSWER, REHYDRATE, CLEAR } from '../constants';

const defaultState = {
	data: [],
	answers: [],
	category: '',
};

export default (state = defaultState, action) => {
	const { type, payload } = action;

	switch(type) {
		case TEST + SUCCESS: {
			return {
				...state,
				data: [ ...payload.data ],
			};
		}

		case TEST + FAIL: {
			return {
				...state,
				data: [],
			};
		}

		case TEST + CATEGORY: {
			return {
				...state,
				category: payload.category,
			};
		}

		case ANSWER: {
			return {
				...state,
				answers: [
					...state.answers,
					payload.answer,
				],
			};
		}

		case TEST + REHYDRATE: {
			return {
				...state,
				...payload,
			};
		}

		case ANSWER + CLEAR: {
			return {
				...state,
				answers: [],
			};
		}

		default: {
			return state;
		}
	}
};