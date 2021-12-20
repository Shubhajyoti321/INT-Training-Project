import { useState } from 'react';
import { Button, Navbar, Nav, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import style from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPatient } from '../../actions/patient.action';

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone number is required!"),
    address: yup.string().required("Address is required!"),
})

const initialValues = {
    name: "",
    phone: "",
    address: ""
}


const Edit = () => {
    const doctorAdminEmail = useSelector((state) => state.login)
    const patientDetails = useSelector((state) => state.patient.patientList)
    console.log(patientDetails[0])
    const dispatch = useDispatch();
    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container>
                    <Navbar.Brand href="#home">Max Hospital</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#"><strong>Welcome</strong> {doctorAdminEmail.email}</Nav.Link>
                            <Nav.Link href="#">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <div className="row">
                    <div className="col-sm-4">
                        <h4 className="text-center">Edit Patient</h4>
                        <div style={{ maxWidth: "350px", width: "100%" }}>
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={(data) => {
                                    dispatch(addPatient(data,
                                        () => {
                                            alert("Success")
                                        },
                                        () => {
                                            alert("Failed")
                                        }
                                    ));
                                }}
                            >
                                {({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
                                    return (
                                        <Form>
                                            <div className="mb-3">
                                                <label>Name</label>
                                                <Field name="name" type="name" value={values.name} className="form-control" placeholder="Enter Name" />
                                                <span className="text-danger">
                                                    <ErrorMessage name="name" />
                                                </span>
                                            </div>
                                            <div className="mb-3">
                                                <label>Phone No</label>
                                                <Field name="phone" type="number" value={values.phone} className="form-control" placeholder="Enter Phone no" />
                                                <span className="text-danger">
                                                    <ErrorMessage name="phone" />
                                                </span>
                                            </div>
                                            <div className="mb-3">
                                                <label>Address</label>
                                                <Field name="address" type="text" value={values.address} className="form-control" placeholder="Enter address no" />
                                                <span className="text-danger">
                                                    <ErrorMessage name="address" />
                                                </span>
                                            </div>
                                            <Button className="mb-3" variant="warning" type="submit">
                                                Submit
                                            </Button>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <h4 className="text-center">Patient List</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(patientDetails)}
                                {patientDetails.map((patientDetail)=>(
                                <tr key={patientDetail.id}>
                                    <td>{patientDetail.id}</td>
                                    <td>{patientDetail.name }</td>
                                    <td>{patientDetail.phone}</td>
                                    <td>{patientDetail.address}</td>
                                    <td><Link to={`/update/${patientDetail.id}`}>Edit</Link></td>
                                </tr>
                                
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>


        </>

    )
}

export default Edit
