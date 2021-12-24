import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import style from './login.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/register.action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sideImg from '../../assets/images/infoGraphic.jpg';

const validationSchema = yup.object({
    name: yup.string().required("Name is required!"),
    email: yup.string()
        .email('Must be a valid email')
        .required("Email is required!"),
    password: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
        .required("Password is required!"),
})

const initialValues = {
    id: "",
    name: "",
    email: "",
    password: ""
}


const Register = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    var bcrypt = require('bcryptjs');
    var hash = bcrypt.hashSync('password', 8);
    

    const handelSubmit = (values, actions) => {
        let registrationData = {
            id: values.name.slice(0, 2).toUpperCase() + new Date().getTime().toString(),
            name: values.name,
            email: values.email,
            password: hash,
        }
        dispatch(register(
            registrationData,
            () => (
                toast.success("Successfully added!"),
                history.push("/")
            ),
            //(err) => { actions.setError(err)}
            // (err) => (
            //     toast.error("Please use another Email Id.")
            // )
            (err) => (
                toast.error(err.email)
            )
        ))

        //Reset Form 
        actions.setSubmitting(false);
        actions.resetForm({
            values: {
                id: "",
                name: "",
                email: "",
                password: "",
            },
        });
    }

    return (
        <div className={style.myContainer}>
            <div className={style.smContainer}>
                <div className="row">
                <div className="col-sm-6 position-relative">
                        <img className='' src={sideImg} className={style.lftImg} alt="" />
                    </div>
                    <div className="col-sm-6">
                        <div className="p-4">
                            <h2 className={style.loginTitle}>Sign Up</h2>
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={handelSubmit}
                            >
                                {({ values, errors, handleChange, isSubmitting, setFieldValue, setFieldTouched, touched }) => {
                                    return (
                                        <Form className={style.smContainer}>
                                            <div className="mb-3">
                                                <label>Name</label>
                                                <Field
                                                    name="name"
                                                    type="text"
                                                    value={values.name}
                                                    className="form-control"
                                                    placeholder="Enter name"
                                                    isInvalid={errors.name && touched.name}
                                                    onBlur={() => setFieldTouched("name")}

                                                />
                                                <span className="text-danger">
                                                    <ErrorMessage name="name" />
                                                </span>
                                            </div>
                                            <div className="mb-3">
                                                <label>Email</label>
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    value={values.email}
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                />
                                                <span className="text-danger">
                                                    <ErrorMessage name="email" />
                                                </span>
                                            </div>
                                            <div className="mb-3">
                                                <label>Password</label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    value={values.password}
                                                    className="form-control"
                                                    placeholder="Enter Password"
                                                />
                                                <span className="text-danger">
                                                    <ErrorMessage name="password" />
                                                </span>
                                            </div>
                                            <Button className="w-100 mb-3" variant="warning" type="submit">
                                                Sign Up
                                            </Button>
                                            <Link className={style.loginSignUpTxt} to="/" >Login with existing account</Link>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register;


