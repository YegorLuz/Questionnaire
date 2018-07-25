import { API_CATEGORY, INIT, SUCCESS, FAIL } from '../constants';
import { axiosInstance, CancelToken, isCanceled } from '../utils';
import { setErrorData, clearErrorData } from './error';
import { start, end } from './screenLoader';

let cancelRequest = null;

export function init() {
	return async dispatch => {
		dispatch(start());

		if (cancelRequest) {
			cancelRequest();
		}

		const config = {
			cancelToken: new CancelToken(c => {
				cancelRequest = c;
			}),
		};
		const onSuccess = response => {
			dispatch(clearErrorData());

			if (response.data) {
				dispatch({
					type: INIT + SUCCESS,
					payload: {
						data: response.data.trivia_categories,
					},
				});
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

		try {
			const response = await axiosInstance.get(API_CATEGORY, config);
			return onSuccess(response);
		} catch (error) {
			return onError(error);
		}
	};
}