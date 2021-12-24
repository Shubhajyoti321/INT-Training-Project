
import React from 'react';
import { } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { addPatient } from '../../actions/patient.action';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
    name: "",
    phone: "",
    email: "",
    address: ""
}

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone number is required!"),
    email: yup.string()
        .required("Email is required!")
        .email('Must be a valid email'),
    address: yup.string().required("Address is required!"),
})

const PatientForm = () => {

    const loggedInUserID = useSelector((state) => state.login.id)
    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {

        const newpatientId = values.name.slice(0, 2).toUpperCase() + new Date().getTime().toString()
    
        const patientData = {
            id: loggedInUserID,
            patientId: newpatientId,
            name: values.name,
            phone: values.phone,
            email: values.email,
            address: values.address,
        }
    
        dispatch(addPatient(
            patientData,
            () => { toast.success("Successfully added!") },
            () => { toast.error("Failed to add!") }
            //(err) => { actions.setError(err)}
        ))
        
        //Reset Form 
        actions.setSubmitting(false);
        actions.resetForm({
            values: {
                // the type of `values` inferred to be Blog
                id: "",
                patientId: "",
                name: "",
                phone: "",
                email: "",
                address: "",
            },
            // you can also set the other form states here
        });
    
    }


    return (
        <div>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
                    return (
                        <Form>
                            <div className='row'>
                                <div className="col-md-3 mb-3">
                                    {/* <label>Name</label> */}
                                    <Field name="name" type="name" value={values.name} className="form-control" placeholder="Enter Name" />
                                    <span className="text-danger">
                                        <ErrorMessage name="name" />
                                    </span>
                                </div>
                                <div className="col-md-3 mb-3">
                                    {/* <label>Phone No</label> */}
                                    <Field name="phone" type="number" value={values.phone} className="form-control" placeholder="Enter Phone no" />
                                    <span className="text-danger">
                                        <ErrorMessage name="phone" />
                                    </span>
                                </div>
                                <div className="col-md-3 mb-3">
                                    {/* <label>Email</label> */}
                                    <Field name="email" type="email" value={values.email} className="form-control" placeholder="Enter Email ID" />
                                    <span className="text-danger">
                                        <ErrorMessage name="email" />
                                    </span>
                                </div>
                                <div className="col-md-3 mb-3">
                                    {/* <label>Address</label> */}
                                    <Field name="address" type="text" value={values.address} className="form-control" placeholder="Enter address no" />
                                    <span className="text-danger">
                                        <ErrorMessage name="address" />
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <button className="mb-3 btn btn-warning" type="submit">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            <ToastContainer
                position="top-right"
            />
        </div>
    )
}

export default PatientForm


