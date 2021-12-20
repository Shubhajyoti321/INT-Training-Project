import { ADDPATIENT, DELETEPATIENT, UPDATEPATIENT } from '../action-types/action.types';

// import isEmpty from 'lodash/isEmpty';

const initialStates = {
	patientList: [],
};

const patient = (state = initialStates, action) => {
	switch (action.type) {

		case ADDPATIENT:
			const patientDetails = action.payload
			console.log("-----------",patientDetails)
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
			const updatePatientId = action.payload.patientID
			return {
				...state,
				patientList: [...state.patientList, updatePatientId]
			};

		default:
			return state;
	}
};

export default patient;
