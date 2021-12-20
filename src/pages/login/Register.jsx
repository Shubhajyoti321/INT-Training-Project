import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import style from './login.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/register.action';

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

    const handelSubmit = (values, actions) => {
        let registrationData = {
            id: values.name.slice(0, 2).toUpperCase() + new Date().getTime().toString(),
            name: values.name,
            email: values.email,
            password: values.password,
        }
        dispatch(register(
            registrationData,
            () => (
                alert("Successfully added!"),
                history.push("/")
            ),
            //(err) => { actions.setError(err)}
            () => (
                alert("Please use another Email Id.")
            )
        ))
    }

    return (
        <div className={style.myContainer}>
            <div style={{ maxWidth: "350px", width: "100%" }}>
                <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>Sign Up</h2>
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
    )
}

export default Register;


