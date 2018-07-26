import { HOME, INIT, SUCCESS } from '../constants';

const defaultState = {
	categories: [],
	difficulty: [
		{ id: 'easy', name: 'Easy' },
		{ id: 'medium', name: 'Medium' },
		{ id: 'hard', name: 'Hard' },
	],
};

export default (state = defaultState, action) => {
	const { type, payload } = action;

	switch(type) {
		case INIT + SUCCESS: {
			return {
				...state,
				categories: payload.data,
			};
		}
		case HOME: {
			return state;
		}
		default: {
			return state;
		}
	}
};