import axios from 'axios';
import { API_HOST, CONTENT_HEADER } from '../constants';

/**
 * Axios Cancel Token
 */
export const CancelToken = axios.CancelToken;

/**
 * Axios Instance for requests
 * @type {AxiosInstance}
 */
export const axiosInstance = axios.create({
	baseURL: API_HOST,
	headers: {
		...CONTENT_HEADER,
	},
});

/**
 * Checks is Request was canceled
 * @param {object} thrown - error object
 * @returns {boolean}
 */
export function isCanceled (thrown) {
	return axios.isCancel(thrown);
}

/**
 * builds query string from params
 * @param {object} params
 * @param {string} urlPart - if it's needed to specify api url
 * @returns {string}
 */
export function getQueryString(params, urlPart = '') {
	const str = Object.keys(params).reduce((acc, key) => {
		acc.push(`${key}=${params[key]}`);
		return acc;
	}, []).join('&');

	if (str.length) {
		return `${urlPart}?${str}`;
	}

	return urlPart;
}