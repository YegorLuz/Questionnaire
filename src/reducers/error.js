import { ERROR, SET, CLEAR } from '../constants';

const defaultState = {
	data: {},
};

export default (state = defaultState, action) => {
	const { type, payload } = action;

	switch(type) {
		case ERROR + SET: {
			return {
				...state,
				data: payload.data,
			};
		}
		case ERROR + CLEAR: {
			return {
				...state,
				data: {},
			};
		}
		default: {
			return state;
		}
	}
};