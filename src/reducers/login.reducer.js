import { LOGINFORM, LOGOUTFORM } from "../action-types/action.types";

// import isEmpty from 'lodash/isEmpty';

const initialStates = {
	isLoggedin:false,
	id:"",
    email:"",
};

const login = (state = initialStates, action) => {
	switch (action.type) {
		case LOGINFORM:
			const loggedInUserEmail = action.payload.email;
			const userId = action.id;
			return {
				...state,
				isLoggedin: true,
				id: userId,
				email: loggedInUserEmail,
				
			};
		case LOGOUTFORM:
			return {
				...state,
				isLoggedin:false,
				id: "",
				email:"",
			};
		default:
			return state;
	}
};

export default login;
