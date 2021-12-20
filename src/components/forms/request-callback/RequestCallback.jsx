import { Formik, Form as FormikForm } from "formik";
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import Select from 'react-select';
// import moment from "moment";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

import './requestCallback.styles.css';
import '../styles.css';

import { GENDERS_FORM, REGEX_FULL_NAME } from "../../../shared/constants";
import { numberFieldValidation, selectGender } from "../../../shared/common";

const initialValues = {
	name		: '',
	mobile_no	: '',
	email		: '',
	gender		: '',
	// dob			: '',
	terms_of_service: false,
};

/**
 * Request Callback
 */

const RequestCallback = (props) => {
	const dispatch = useDispatch();
	const history  = useHistory();
	const userData = useSelector((state) => state.auth.userData);

	const validateRequestCallBack = Yup.object().shape({
		name: Yup.string()
		.trim()
		.min(1, "Name cannot be less than 1 character long")
		.max(40, "Name cannot be more than 40 characters long")
		.required("Please enter your Name")
		.test(
			"name",
			"Name supports only alphabets and some other characters. ('.)",
			(value) => value && value.match(REGEX_FULL_NAME)
		),
		mobile_no: Yup.string()
		.min(10, "Mobile number must have minimum 10 digits")
		.max(10, "Mobile number must have maximum 10 digits")
		.trim()
		.required("Please enter your Mobile Number")
		.matches("^[0-9]+$", "Mobile number should be numbers"),
		email: Yup.string()
		.trim()
		.email("Enter valid Email Id")
		.required("Please enter Email Id"),
        gender: Yup.object().required("Please select Gender"),
        // dob: Yup.string().required("Please select Date Of Birth"),
        terms_of_service: Yup.boolean().oneOf([true], 'Please agree to the Terms of Use and Privacy Policy'),
	});

  	const handleSubmitEvent = (values, actions) => {
		let post_data = {
			name 		: values.name,
			mobile_no 	: values.mobile_no,
			email     	: values.email,
			gender	  	: values.gender.value,
			// dob		  	: moment(values.dob).format("YYYY-MM-DD"),
		}
		// Make API call
  	}

	const newInitialValues = Object.assign(initialValues, {
		name		: userData && Object.keys(userData).length > 0 ? userData.name : "",
		mobile_no	: userData && Object.keys(userData).length > 0 ? userData.mobile_no: "",
		email		: userData && Object.keys(userData).length > 0 ? userData.email: "",
		gender      : userData && Object.keys(userData).length > 0 ? selectGender(userData.gender) : "",
		// dob         : userData && Object.keys(userData).length > 0 && userData.dob != '' ? Number(userData.dob) : '',
	})

	const handleMobileNumberChange = (event, setFieldValue) => {
        event.preventDefault();
        let { value, name } = event.target;
        value = numberFieldValidation(value);
        setFieldValue(name, value);
    }

	return (
		<div className="requestCallWrapper">
			<Row>
				<Col xs={12} md={5} className="callBackBg">
					{/* <img src={callBackBg} /> */}
				</Col>
				<Col xs={12} md={7} className="">
					<h3>Request Callback</h3>
					<Formik
						initialValues={newInitialValues}
						validationSchema={validateRequestCallBack}
						onSubmit={handleSubmitEvent}
					>
					{({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
						return (
							<FormikForm>
								<Form.Group controlId="name">
									<Form.Control
										type="text"
										placeholder="Name *"
										onChange={handleChange}
										value={values.name}
										isInvalid={errors.name && touched.name}
									/>
									{
										errors.name && touched.name? (
											<p className="error no-pos"> {errors.name}</p>
										):(null)
									}
								</Form.Group>
								<Form.Group controlId="mobile_no">
									<Form.Control
										type="text"
										name='mobile_no'
										placeholder="Mobile Number *"
										onChange={handleChange}
										value={values.mobile_no}
										onChange={(e) => handleMobileNumberChange(e, setFieldValue)}
										isInvalid={errors.mobile_no && touched.mobile_no}
									/>
									{
										errors.mobile_no && touched.mobile_no? (
											<p className="error no-pos"> {errors.mobile_no}</p>
										):(null)
									}
								</Form.Group>
								<Form.Group controlId="email">
									<Form.Control
										type="text"
										placeholder="Email Id *"
										onChange={handleChange}
										value={values.email}
										isInvalid={errors.email && touched.email}
									/>
									{
										errors.email && touched.email? (
											<p className="error no-pos"> {errors.email}</p>
										):(null)
									}
								</Form.Group>
								<Form.Row>
									<Form.Group as={Col} sm="6" controlId="gender">
										<Select
											options={GENDERS_FORM}
											className="basic-select"
											classNamePrefix="select"
											getOptionValue={x => x.value}
											getOptionLabel={x => x.label}
											onChange={(evt) => setFieldValue("gender",evt)}
											defaultValue={values.gender}
											placeholder="Select Gender *"
										/>
										{
											errors.gender && touched.gender? (
												<p className="error no-pos"> {errors.gender}</p>
											):(null)
										}
									</Form.Group>
									{/* <Form.Group as={Col} sm="6" controlId="dob">
										<div className="custom-date">
											<DatePicker
												name="dob"
												showMonthDropdown
												showYearDropdown
												minDate={new Date(moment().subtract(100, "years"))}
												maxDate={new Date()}
												// maxDate={new Date(moment().subtract(18, "years"))}
												dropdownMode="select"
												className="form-control calInput"
												selected={values.dob}
												dateFormat="dd-MM-yyyy"
												autoComplete="off"
												placeholderText="Date Of Birth *"
												onChange={(e) => {
													if (e === null) {
														setFieldValue("dob","");
													} else {
														setFieldValue("dob",e);
													}
												}}
											/>
											{
												values.dob ? (
													<div className="close-btn">
														<button onClick={()=> setFieldValue("dob","")}>
															<i className="fa fa-close"></i>
														</button>
													</div>
												)
												: (null)
											}
										</div>
										{
											errors.dob && touched.dob? (
												<p className="error no-pos"> {errors.dob} </p>
											) : ( null )
										}
									</Form.Group> */}
								</Form.Row>
								<Form.Group as={Col} md="12" className="text-left">
									<div className="form-check">
										<input 
											name='terms_of_service'
											className="form-check-input mr-2"
											id="bookhc-agreement"
											type="checkbox" 
											onChange={handleChange}
										/>
										<label for="bookhc-agreement">
											I agree to the
										</label>
										<span 
											className="pointer mr-2 ml-2 text-primary" 
											onClick={() => null }
										> 
											Terms of Use 
										</span> 
										<label for="bookhc-agreement">and </label>
										<span 
											className="pointer ml-2 text-primary"
											onClick={() => null }
										> 
											Privacy Policy
										</span>
										{
											errors.terms_of_service && touched.terms_of_service ? (
												<p className="errorMsg no-pos"> {errors.terms_of_service}</p>
											) : (null)
										}
									</div>
								</Form.Group>
								{
									errors.message ? (
										<Row>
											<Col xs={12} sm={12} md={12}>
												<span className="errorMsg">{errors.message}</span>
											</Col>
										</Row>
									) : (null)
								}       
								<Button
									variant="primary"
									className="btn btnRed" 
									type="submit"
									disabled={isSubmitting}
								>
									{
										isSubmitting ? ( "Sending Request" ) : ( "Send Request" )
									}
								</Button>
							</FormikForm>
						);
					}}
				</Formik>
			</Col>
			</Row>
		</div>
	);
};

export default RequestCallback;
