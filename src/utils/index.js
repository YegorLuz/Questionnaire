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