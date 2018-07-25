import { SCREEN_LOADER, START, END } from '../constants';

const defaultState = {
	loading: false,
};

export default (state = defaultState, action) => {
	const { type } = action;

	switch(type) {
		case SCREEN_LOADER + START: {
			return {
				...state,
				loading: true,
			};
		}
		case SCREEN_LOADER + END: {
			return {
				...state,
				loading: false,
			};
		}
		default: {
			return state;
		}
	}
};