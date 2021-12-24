import { LOGINFORM, LOGOUTFORM } from "../action-types/action.types";

export const login = (payload, onSuccess, onError) => {

    return (dispatch, getState) => {

        let registeredUsers = getState().register.registeredUser;
        const getRegisteredUsersEmail = registeredUsers.find(({ email }) => email === payload.email).email;
        const getRegisteredUsersPassword = registeredUsers.find(({ email }) => email === payload.email).password;
        //const comparePassword = bcrypt.compareSync(payload.password, getuserPassword)

        console.log("action payload---",payload.password)
        console.log("get incripted password---",getRegisteredUsersPassword)

        if ( getRegisteredUsersEmail && getRegisteredUsersPassword) {
            let id = registeredUsers.find(({ email }) => email === payload.email).id
            let name = registeredUsers.find(({ email }) => email === payload.email).name
            dispatch({
                type: LOGINFORM,
                payload,
                id,
                name
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
