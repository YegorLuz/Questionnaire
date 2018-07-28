import { SCREEN_LOADER, START, END } from '../constants';

/**
 * show loader
 * @returns {{type: *}}
 */
export function start() {
	return {
		type: SCREEN_LOADER + START,
	};
}

/**
 * Hide loader
 * @returns {{type: *}}
 */
export function end() {
	return {
		type: SCREEN_LOADER + END,
	};
}