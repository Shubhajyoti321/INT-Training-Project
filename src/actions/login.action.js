import { LOGINFORM, LOGOUTFORM } from "../action-types/action.types";

export const login = (payload, onSuccess, onError) => {

    return (dispatch, getState) => {
        let registeredUsers = getState().register.registeredUser;
        if (registeredUsers.find(({ email }) => email === payload.email) && registeredUsers.find(({ password }) => password === payload.password)) {
            let id = registeredUsers.find(({ email }) => email === payload.email).id
            dispatch({
                type: LOGINFORM,
                payload,
                id,
            })
            onSuccess && onSuccess("Login Successfull");

        } else {
            console.log("else")
            onError && onError({password:"Invalit Paswaord", email:"Invalid Email"});

        }
    };
};

export const logout = () => {
    return (dispatch, getState) => {
        dispatch({
            type: LOGOUTFORM,
        })

    };
};
