import jwt_decode from 'jwt-decode';

import {
	LOGIN,
	LOGOUT,
} from '../action-types/action.types';
import API from '../shared/api';
import * as ErrorMessages from '../Error/ErrorMessage/errorMessage';


const setupUserLogin = (res, dispatch) => {
	let decodeData = jwt_decode(res.data.token);
	localStorage.setItem('token', res.data.token);
	dispatch({
		type: LOGIN,
		payload: {
			isloggedin: res.data.token !== null || res.data.token != undefined ? true : false,
			auth_token: res.data.token,
			userData: decodeData,
		},
	});
};

export const login = (payload, onSuccess, onError) => {
	return (dispatch) => {
		API.post(`/login`, payload)
			.then((res) => {
				if (res && res.data.status === 1) {
					setupUserLogin(res, dispatch);
					onSuccess && onSuccess(res.data);
				} else {
					onError && onError({ message: ErrorMessages.SOMETHING_WENT_WRONG_TRY_LATER });
				}
			})
			.catch((error) => {
				if (error && error.data) {
					onError && onError(error.data);
				} else {
					onError && onError({ message: ErrorMessages.SOMETHING_WENT_WRONG_TRY_LATER });
				}
			});
	};
};