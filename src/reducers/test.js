import { TEST, SUCCESS, FAIL, CATEGORY } from '../constants';

const defaultState = {
	data: [],
	selectedCategory: '',
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
				selectedCategory: payload.category,
			};
		}
		default: {
			return state;
		}
	}
};