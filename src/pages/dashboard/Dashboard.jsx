import { useState } from 'react';
import { Button, Navbar, Nav, Container, Table, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import style from './dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { updatePatient } from '../../actions/patient.action';
import { deletePatient } from '../../actions/patient.action';
import { logout } from '../../actions/login.action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconContext } from "react-icons";
import { FiLogOut } from "react-icons/fi";
import { BsPencil, BsTrash } from "react-icons/bs";
import logoImg from '../../assets/images/logo.png';
import PatientForm from './PatientForm';


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

    const [editData, seteditData] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = (patientData) => {
        seteditData(patientData)
        console.log(patientData)
        const newInitialValues = Object.assign(initialValues, {
            id: patientData && Object.keys(patientData).length > 0 ? patientData.id : "",
            patientId: patientData && Object.keys(patientData).length > 0 ? patientData.patientId : "",
            name: patientData && Object.keys(patientData).length > 0 ? patientData.name : "",
            email: patientData && Object.keys(patientData).length > 0 ? patientData.email : "",
            phone: patientData && Object.keys(patientData).length > 0 ? patientData.phone : "",
            address: patientData && Object.keys(patientData).length > 0 ? patientData.address : "",
        })
        console.log("newInitialValues along with patient Id=====", newInitialValues)
        setShow(true);
    };

    const isloggedin = useSelector((state) => state?.login?.isLoggedin)
    const loggedInUserID = useSelector((state) => state.login.id)
    const loggedInUserName = useSelector((state) => state.login.name)
    //const loggedInUserEmail = useSelector((state) => state.login.email)

    const patientDetailsList = useSelector((state) => state.patient.patientList)
    const segregatedPatientsList = patientDetailsList.filter(segregatedUser => segregatedUser.id === loggedInUserID)
    const dispatch = useDispatch();

    const handleUpdate = (values, actions) => {

        const updatePatientData = {
            id: editData.id,
            patientId: editData.patientId,
            name: values.name,
            phone: values.phone,
            email: values.email,
            address: values.address,
        }

        console.log("Update patient data.....................", updatePatientData)

        dispatch(updatePatient(
            updatePatientData,
            () => { toast.success("Successfully Updated!") },
            () => { toast.error("Failed to Update!") }
            //(err) => { actions.setError(err)}
        ))

        //Reset Form 
        actions.setSubmitting(false);
        actions.resetForm({
            values: {
                id: "",
                patientId: "",
                name: "",
                phone: "",
                email: "",
                address: "",
            },
        });
        
        setShow(false);
    }


    if (!isloggedin) return <Redirect to={{ pathname: '/', }} />
    return (
        <>
            <Navbar expand="xl" className={style.navBg}>
                <Container>
                    <Navbar.Brand href="#home" className='text-white'><img src={logoImg} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#" className='text-white'><span>Welcome</span>, <strong>{loggedInUserName}</strong></Nav.Link>
                            <Nav.Link href="#" className='text-white' onClick={() => { dispatch(logout()) }}>
                                <IconContext.Provider value={{ className: "global-class-name" }}>
                                    <FiLogOut />
                                </IconContext.Provider>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <div className="row p-3 mb-5 bg-light">
                    <div className="col-sm-12">
                        <h4 className='mb-3'>Add Patient</h4>
                        <div>
                            <PatientForm/>
                        </div>
                    </div>
                </div>
            </Container>
            <Container fluid>
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="mb-3">Patient List</h4>
                        <Table striped bordered hover>
                            <thead className='table-info'>
                                <tr>
                                    <th width="20%">Name</th>
                                    <th width="20%">Phone Number</th>
                                    <th>Email ID</th>
                                    <th width="30%">Address</th>
                                    <th width="10%">Actions</th>
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
                                            <button type="button" className='btn btn-success custumLinkBtn' onClick={() => handleShow(segregatedPatient)} /*to={`/update/${segregatedPatient.patientId}`}*/><BsPencil /></button>
                                            <button type='button' className='btn btn-danger custumLinkBtn' onClick={() => dispatch(deletePatient(segregatedPatient.patientId))}><BsTrash /></button></td>
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
                                        Update
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
            <ToastContainer
                position="top-right"
            />

        </>

    )
}

export default Dashboard
