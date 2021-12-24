import { LOGINFORM, LOGOUTFORM } from "../action-types/action.types";

// import isEmpty from 'lodash/isEmpty';

const initialStates = {
	isLoggedin:false,
	id:"",
	name:"",
    email:"",
};

const login = (state = initialStates, action) => {
	switch (action.type) {
		case LOGINFORM:
			const loggedInUserEmail = action.payload.email;
			const userId = action.id;
			const userName = action.name;
			console.log(action)
			return {
				...state,
				isLoggedin: true,
				id: userId,
				name: userName,
				email: loggedInUserEmail,
				
			};
		case LOGOUTFORM:
			return {
				...state,
				isLoggedin:false,
				id: "",
				name: "",
				email:"",
			};
		default:
			return state;
	}
};

export default login;
