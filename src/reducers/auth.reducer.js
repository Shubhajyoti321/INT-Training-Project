import { LOGIN, LOGOUT } from '../action-types/action.types';

// import isEmpty from 'lodash/isEmpty';

const initialStates = {
	isloggedin: false,
	email: '',
	errorMsg: '',
	auth_token: '',
	userData: {},
};

const auth = (state = initialStates, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				isloggedin: action.payload.isloggedin,
				auth_token: action.payload.auth_token,
				userData: action.payload.userData,
			};
		case LOGOUT:
			return {
				state: undefined,
			};
		default:
			return state;
	}
};

export default auth;
