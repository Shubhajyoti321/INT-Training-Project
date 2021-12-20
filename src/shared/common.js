import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';

import { GENDERS_FORM, REGEX_DIGITS } from './constants';

export const selectGender = (gender) => {
	if (gender) {
		const selectedGender = find(GENDERS_FORM, { value: gender });
		if (selectedGender && !isEmpty(selectedGender)) {
			return selectedGender;
		}
	}
	return { label: '', value: '' };
};

export const numberFieldValidation = (value) => {
	if (value.slice(-1)) {
		if(value.charAt(0) !== "0"){
			if (!REGEX_DIGITS.test(value.slice(-1)) || value.length > 10 || parseInt(value.slice(-1) === 0)) {
				let newValue = value.slice(0, value.length - 1);
				return newValue;
			} else {
				return value;
			}
		}else {
			let newValue = value.slice(1, value.length);
			return newValue;
		}
	} else {
		return '';
	}
};