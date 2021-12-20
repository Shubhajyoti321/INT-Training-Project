import { REGISTERFORM } from "../action-types/action.types";


export const register = (payload, onSuccess, onError) => {

	return (dispatch, getState) => {

        const registerUser = getState().register.registeredUser;

        const userExist = registerUser.some(({email}) => email == payload.email)
        if(!userExist){
            dispatch ({
                type : REGISTERFORM,
                payload
            });
            onSuccess && onSuccess()
        }else{
            onError && onError({email : "Email already Used"});
        }
            
	};
};

