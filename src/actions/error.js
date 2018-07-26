import { ERROR, SET, CLEAR } from '../constants';

/**
 * Set all Error data to Store for processing it in Components
 * @param {object} error = Error data, received from server
 * @returns {function(*)}
 */
export function setErrorData (error) {
	return dispatch => {

		let status = 0;
		let cause = '';
		let message = '';
		let errors = [];

		if (error.response) {
			if (error.response.data) {
				const data = error.response.data;
				status = data.status || 0;
				cause = data.cause || '';
				message = data.message || '';
				errors = data.errors || [];
			} else {
				status = error.response.status || 0;
				cause = `${error.response.config.method.toUpperCase()} ${error.response.statusText}`;
				message = cause || '';
				errors = [];
			}
		} else if (error.request) {
			status = error.request.status || 500;
			cause = error.request.statusText || 'Server is not responding...';
			message = error.request.message || error.request.statusText || 'Server is not responding...';
			errors = [ message ];
		} else {
			status = 500;
			cause = 'Unknown Error';
			message = error.message || 'Unknown Error';
			errors = [ message ];
		}

		/* Save error data in Store */
		dispatch({
			type: ERROR + SET,
			payload: {
				error: {
					status,
					cause,
					message,
					errors,
				},
			},
		});
	};
}

/**
 * Clear Error Data from Store
 * @returns {object}
 */
export function clearErrorData() {
	return {
		type: ERROR + CLEAR,
	};
}

/**
 * Handle Request errors received on success
 * @param {object} data - data with status code
 * @returns {function(*)}
 */
export function errorOnSuccess(data) {
	return dispatch => {
		const { response_code: type } = data;
		let error = {};

		switch(type) {
			case 1: {
				error = {
					response: {
						data: {
							status: 200,
							cause: 'No Results',
							message: 'Could not return results. The API doesn\'t have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)',
							errors: [],
						},
					},
				};
				break;
			}
			case 2: {
				error = {
					response: {
						data: {
							status: 200,
							cause: 'Invalid Parameter',
							message: 'Contains an invalid parameter. Arguements passed in aren\'t valid. (Ex. Amount = Five)',
							errors: [],
						},
					},
				};
				break;
			}
			case 3: {
				error = {
					response: {
						data: {
							status: 200,
							cause: 'Token Not Found',
							message: 'Session Token does not exist.',
							errors: [],
						},
					},
				};
				break;
			}
			case 4: {
				error = {
					response: {
						data: {
							status: 200,
							cause: 'Token Empty',
							message: 'Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.',
							errors: [],
						},
					},
				};
				break;
			}
			default: {
				error = {};
				break;
			}
		}

		dispatch(setErrorData(error));
	};
}