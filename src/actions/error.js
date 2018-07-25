import { ERROR, SET, CLEAR } from '../constants';

export function setErrorData(data) {
	return {
		type: ERROR + SET,
		payload: data,
	};
}

export function clearErrorData() {
	return {
		type: ERROR + CLEAR,
	};
}