import { API_CATEGORY, API_PATH, INIT, SUCCESS, FAIL, TEST, CATEGORY, ANSWER, REHYDRATE, CLEAR } from '../constants';
import { axiosInstance, CancelToken, isCanceled, getQueryString, clearAllStorageData, setStorageData, getStorageData } from '../utils';
import { setErrorData, clearErrorData, errorOnSuccess } from './error';
import { start, end } from './screenLoader';

let cancelRequest = null;

/**
 * Get categories
 * @returns {function(*)}
 */
export function init() {
	return async dispatch => {
		dispatch(start());

		clearAllStorageData();
		dispatch({
			type: TEST + CLEAR,
		});

		const onSuccess = response => {
			dispatch(clearErrorData());

			if (response.data) {
				dispatch(saveData(INIT, response.data.trivia_categories));
			}

			dispatch(end());
			return response;
		};
		const onError = error => {
			if (!isCanceled(error)) {
				dispatch(setErrorData(error));

				dispatch({
					type: INIT + FAIL,
				});
			}

			dispatch(end());
			return error;
		};

		await requestData(API_CATEGORY, onSuccess, onError);
	};
}

/**
 * Request data for Test
 * @param {object} params
 * @param {string} category - category name
 * @returns {function(*)}
 */
export function getTestData(params, category = '') {
	return async dispatch => {
		dispatch(start());

		const onSuccess = response => {
			dispatch(clearErrorData());
			dispatch({
				type: TEST + CATEGORY,
				payload: {
					category,
				},
			});
			setStorageData('category', category);

			if (response.data && !response.data.response_code) {
				dispatch(saveData(TEST, response.data.results));
				setStorageData('data', response.data.results);
				setStorageData('answers', []);
			} else {
				dispatch(errorOnSuccess(response.data));
			}

			dispatch(end());
			return response;
		};
		const onError = error => {
			if (!isCanceled(error)) {
				dispatch(setErrorData(error));

				dispatch({
					type: TEST + FAIL,
				});
			}

			dispatch(end());
			return error;
		};
		const resp = response => response;

		const response = await requestData(getQueryString(params, API_PATH), onSuccess, onError);
		return resp(response);
	};
}

/**
 * Universal function for making data requests
 * @param {string} requestUrl - request url
 * @param {function(*)} [onSuccess] - callback function, called on success
 * @param {function(*)} [onError] - callback function, called on error
 * @returns {function(*)}
 */
async function requestData (requestUrl, onSuccess = () => null, onError = () => null) {
	if (cancelRequest) {
		cancelRequest();
	}

	const config = {
		cancelToken: new CancelToken(c => {
			cancelRequest = c;
		}),
	};

	try {
		const success = await axiosInstance.get(requestUrl, config);
		return onSuccess(success);
	} catch (error) {
		return onError(error);
	}
}

/**
 * Universal function for saving received from server data
 * @param {string} type
 * @param {object} [data] - data to save
 * @returns {object}
 */
function saveData (type, data = {}) {
	return {
		type: type + SUCCESS,
		payload: {
			data,
		},
	};
}

/**
 * Save answer in store and in Storage
 * @param {bool} answer
 * @returns {function(*, *)}
 */
export function saveAnswer(answer) {
	return (dispatch, getState) => {
		const state = getState();
		setStorageData('answers', [ ...state.test.answers, answer ]);
		dispatch({
			type: ANSWER,
			payload: {
				answer,
			},
		});
	};
}

/**
 * Updates data from Storage
 * @returns {function(*)}
 */
export function getProgress() {
	return dispatch => {
		const category = getStorageData('category') || '';
		const data = getStorageData('data') || [];
		const answers = getStorageData('answers') || [];
		dispatch({
			type: TEST + REHYDRATE,
			payload: {
				category,
				data,
				answers,
			},
		});
	};
}

/**
 * Clear all answers
 * @returns {function(*)}
 */
export function clearAnswers() {
	return dispatch => {
		setStorageData('answers', []);
		dispatch({
			type: ANSWER + CLEAR,
		});
	};
}