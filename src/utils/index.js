import axios from 'axios';
import { API_HOST, CONTENT_HEADER, TEST_KEY, STORAGE_KEY } from '../constants';

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

/**
 * Checks LocalStorage for availability
 * @returns {boolean}
 */
export const checkLocalStorage = () => {
	try {
		localStorage.setItem(TEST_KEY, 'test');
		localStorage.getItem(TEST_KEY);
		localStorage.removeItem(TEST_KEY);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * Checks SessionStorage for availability
 * @returns {boolean}
 */
export const checkSessionStorage = () => {
	try {
		sessionStorage.setItem(TEST_KEY, 'test');
		sessionStorage.getItem(TEST_KEY);
		sessionStorage.removeItem(TEST_KEY);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * Gets all data saved in Local/Session Storage
 * @returns {object}
 */
const getAllStorageData = () => {
	let data = '{}';

	if (checkLocalStorage()) {
		data = localStorage.getItem(STORAGE_KEY);

		if (!data) {
			data = sessionStorage.getItem(STORAGE_KEY);
		}
	} else if (checkSessionStorage()) {
		data = sessionStorage.getItem(STORAGE_KEY);

		if (!data) {
			data = localStorage.getItem(STORAGE_KEY);
		}
	}

	return JSON.parse(data || '{}');
};

/**
 * Returns stored under 'key' param name data
 * @param {string} key - the param name under which data is stored
 * @returns {*|null}
 */
export const getStorageData = key => {
	const data = getAllStorageData();
	return data[key] || null;
};

/**
 * Saves data to Local/Session Storage under 'key' param name
 * @param {string} key - the param name under which data is stored
 * @param {*} data - saving data
 */
export const setStorageData = (key, data) => {
	const storageData = getAllStorageData();
	const dataToSave = JSON.stringify({
		...storageData,
		[key]: data,
	});

	if (checkLocalStorage()) {
		localStorage.setItem(STORAGE_KEY, dataToSave);
	} else if (checkSessionStorage()) {
		sessionStorage.setItem(STORAGE_KEY, dataToSave);
	}
};

/**
 * Removes all data saved for this app in Local/Session Storage
 */
export const clearAllStorageData = () => {
	if (checkLocalStorage()) {
		localStorage.removeItem(STORAGE_KEY);
	} else if (checkSessionStorage()) {
		sessionStorage.removeItem(STORAGE_KEY);
	}
};