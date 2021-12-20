import { useState } from 'react';
import { Button, Navbar, Nav, Container, Table, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import style from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPatient } from '../../actions/patient.action';
import { updatePatient } from '../../actions/patient.action';
import { deletePatient } from '../../actions/patient.action';
import { logout } from '../../actions/login.action';

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

const Dashboard = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isloggedin = useSelector((state) => state?.login?.isLoggedin)
    const loggedInUserID = useSelector((state) => state.login.id)
    const loggedInUserEmail = useSelector((state) => state.login.email)
    const patientDetailsList = useSelector((state) => state.patient.patientList)
    const segregatedPatientsList = patientDetailsList.filter(segregatedUser => segregatedUser.id === loggedInUserID)
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
            () => { alert("Successfully added!") },
            () => { alert("Failed to add!") }
            //(err) => { actions.setError(err)}
        ))
    }

    const handleUpdate = (values, actions) => {

        const updatePatientData = {
            //patientId: newpatientId,
            name: values.name,
            phone: values.phone,
            email: values.email,
            address: values.address,
        }

        dispatch(updatePatient(
            updatePatientData,
            () => { alert("Successfully Updated!") },
            () => { alert("Failed to Update!") }
            //(err) => { actions.setError(err)}
        ))
    }


    if (!isloggedin) return <Redirect to={{ pathname: '/', }} />
    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container>
                    <Navbar.Brand href="#home">Max Hospital</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#"><strong>Welcome</strong> {loggedInUserEmail}</Nav.Link>
                            <Nav.Link href="#" onClick={() => { dispatch(logout()) }}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <div className="row">
                    <div className="col-sm-4">
                        <h4 className="text-center">Add Patient</h4>
                        <div style={{ maxWidth: "350px", width: "100%" }}>
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
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
                                                <label>Email</label>
                                                <Field name="email" type="email" value={values.email} className="form-control" placeholder="Enter Email ID" />
                                                <span className="text-danger">
                                                    <ErrorMessage name="email" />
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
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Email ID</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {segregatedPatientsList.length >= 1 ? segregatedPatientsList && segregatedPatientsList.map((segregatedPatient, i) =>
                                    <tr key={segregatedPatient.id}>
                                        <td>{segregatedPatient.name}</td>
                                        {/* <td>{segregatedPatient?.data?.name?.id}</td> */}
                                        {/* <td>{segregatedPatient.data && segregatedPatient.data.name && segregatedPatient.data.name.id && segregatedPatient.data.name.id}</td> */}
                                        <td>{segregatedPatient.phone}</td>
                                        <td>{segregatedPatient.email}</td>
                                        <td>{segregatedPatient.address}</td>
                                        <td>
                                            <Link className='btn btn-info btn-sm me-2' onClick={handleShow} to="#" /*to={`/update/${segregatedPatient.patientId}`}*/>Edit</Link>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={() => dispatch(deletePatient(segregatedPatient.patientId))}>Delete</button></td>
                                    </tr>
                                ) :
                                    <tr className="alert alert-primary">
                                        <td colSpan="5">
                                            No patient added!
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update Patient</Modal.Title>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={handleUpdate}
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
                                        <label>Email</label>
                                        <Field name="email" type="email" value={values.email} className="form-control" placeholder="Enter Email ID" />
                                        <span className="text-danger">
                                            <ErrorMessage name="email" />
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

                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>


        </>

    )
}

export default Dashboard
