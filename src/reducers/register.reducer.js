import { REGISTERFORM } from '../action-types/action.types';

// import isEmpty from 'lodash/isEmpty';

const initialStates = {
	registeredUser:[],
};

const register = (state = initialStates, action) => {

	switch (action.type) {
		
		case REGISTERFORM:
			const registerUser = action.payload
			return {
				...state,
				registeredUser: [...state.registeredUser, registerUser],
			};

		default:
			return state;
	}
};

export default register;
