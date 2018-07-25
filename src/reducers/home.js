import { HOME, INIT, SUCCESS } from '../constants';

const defaultState = {
	data: [],
};

export default (state = defaultState, action) => {
	const { type, payload } = action;

	switch(type) {
		case INIT + SUCCESS: {
			return {
				...state,
				data: payload.data,
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