import { ADDPATIENT, DELETEPATIENT, UPDATEPATIENT } from '../action-types/action.types';

// import isEmpty from 'lodash/isEmpty';

const initialStates = {
	patientList: [],
};

const patient = (state = initialStates, action) => {
	switch (action.type) {

		case ADDPATIENT:
			const patientDetails = action.payload
			console.log("-----------", patientDetails)
			return {
				...state,
				patientList: [...state.patientList, patientDetails]
			};

		case DELETEPATIENT:
			const deletePatientId = action.payload.patientID
			return {
				...state,
				patientList: state.patientList.filter(patients => patients.patientId !== deletePatientId),
			};

		case UPDATEPATIENT:
			const index = state.patientList.findIndex(user => user.patientId === action.payload.patientId);
			const newPatientList = [...state.patientList];
			newPatientList[index].name = action.payload.name;
			newPatientList[index].phone = action.payload.phone;
			newPatientList[index].email = action.payload.email;
			newPatientList[index].address = action.payload.address;
			return {
				...state,
				patientList: newPatientList
			};
		default:
			return state;
	}
};

export default patient;
