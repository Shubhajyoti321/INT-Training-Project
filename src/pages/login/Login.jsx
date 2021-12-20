import React, { useState, useEffect } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import style from './login.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/login.action';

const initialValues = {
    email:"",
    password:""
}

const validationSchema = yup.object({
    email: yup.string().email('Must be a valid email').required("Email is required!"),
    password: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
        .required("Password is required!"),
})

const Login = (props) => {

    const dispatch = useDispatch();
    const isloggedin = useSelector((state) => state.login.isLoggedin)
 
    const handleSubmit = (values, actions) => {

        const loggedInUser = {
            email:values.email,
            password:values.password
        }

        dispatch(login(
            loggedInUser, 
            (msg) => {
                alert(msg)
            }, 
            (err) => {
                actions.setErrors(err)
            }
        ))

    }

    if (isloggedin) return <Redirect to={{ pathname: props.location.state && props.location.state.from ? props.location.state.from : '/dashboard' }} />

    console.log("props location state", props.location.state)

    return (
        <div className={style.myContainer}>
            <div style={{ maxWidth: "350px", width: "100%" }}>
                <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "20px"}}>Login</h2>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    // initialValues={{
                    //     name: "",
                    //     email: "",
                    //     password: ""
                    // }}
                    // onSubmit={(data) => {
                    //     try {
                    //         dispatch(login(data,
                    //             () => {
                    //                 alert("Success")
                    //             },
                    //             () => {
                    //                 alert("Failed")
                    //             }

                    //         ));
                    //     } catch (err) {
                    //         console.log(err)
                    //     }
                    // }}
                >
                    {({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
                        return (
                            <Form className={style.smContainer}>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <Field name="email" type="email" value={values.email} className="form-control" placeholder="Enter email" />
                                    <span className="text-danger">
                                        <ErrorMessage name="email" />
                                    </span>
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <Field name="password" type="password" value={values.password} className="form-control" placeholder="Enter Password" />
                                    <span className="text-danger">
                                        <ErrorMessage name="password" />
                                    </span>
                                </div>
                                <Button className="w-100 mb-3" variant="warning" type="submit">
                                    Login
                                </Button>
                                <Link className={style.loginSignUpTxt} to="/register">Create new account</Link>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default withRouter(Login);
