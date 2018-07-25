import { SCREEN_LOADER, START, END } from '../constants';

export function start() {
	return {
		type: SCREEN_LOADER + START,
	};
}

export function end() {
	return {
		type: SCREEN_LOADER + END,
	};
}