import { ADDPATIENT, DELETEPATIENT, UPDATEPATIENT } from "../action-types/action.types";

export const addPatient = (payload, onSuccess, onError) => {
	return (dispatch, getState) => {
        console.log("paylodddddddd", payload)
            dispatch ({
                type : ADDPATIENT,
                payload, 
            });
            onSuccess && onSuccess()
	};
};

export const deletePatient = (userId, onSuccess) => {
	return (dispatch, getState) => {
            dispatch ({
                type : DELETEPATIENT,
                payload: {
                    patientID: userId,
                },
            });
            onSuccess && onSuccess()
	};
};


export const updatePatient = (userId, onSuccess) => {
	return (dispatch, getState) => {
            dispatch ({
                type : UPDATEPATIENT,
                payload: {
                    patientID: userId,
                },
            });
            onSuccess && onSuccess()
	};
};

