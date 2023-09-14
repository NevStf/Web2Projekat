import React, { useEffect, useState }  from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { userRegister } from '../../services/authService';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Field,
  FieldProps,
} from 'formik';


function Register() {

  const validationSchema = Yup.object({
    emailAdresa:Yup.string()
        .email("Incorrect email format")
        .required("Email is required"),
    ime: Yup.string().required("Name is required"),
    prezime: Yup.string().required("Last name is required"),
    kIme: Yup.string().required("Username is required"),
    lozinka: Yup.string().required("Password is required")
        .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and it must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character."
    ),
    potvrdaLozinka: Yup.string().oneOf([Yup.ref("lozinka"), null], "Passwords are not matching").required("Password confirmation is required"),
    datumRodjenja: Yup.string().required("date of birth is required"),
    adresa: Yup.string().required("Address is required"),
    tip: Yup.string().required("User type is required"),      
})

  const formik = useFormik({
  initialValues: {
    emailAdresa: "",
    ime: "",
      prezime: "",
      kIme: "",
      lozinka: "",
    potvrdaLozinka: "",
    datumRodjenja: "",
    adresa: "",
    tip: "",
    slika:"",
    status:0,
  },
  validationSchema,
  onSubmit: async (values) => {
    await userRegister(values);
  },

  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;
  
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Logo
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="kIme">
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"
                        value={values.kIme}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />  
                         {touched.kIme && errors.kIme && <div>{errors.kIme}</div>}
                      </Form.Group>
                      

                      <Form.Group className="mb-3" controlId="ime">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name"
                         value={values.ime}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         />   
                             {touched.ime && errors.ime && <div>{errors.ime}</div>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="prezime">
                        <Form.Label className="text-center">Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter LastName"
                        value={values.prezime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         />
                          {touched.prezime && errors.prezime && <div>{errors.prezime}</div>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="emailAdresa">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                                value={values.emailAdresa}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />  
                                 {touched.emailAdresa && errors.emailAdresa && <div>{errors.emailAdresa}</div>}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="lozinka"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        value={values.lozinka}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         />
                          {touched.lozinka && errors.lozinka && <div>{errors.lozinka}</div>}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="potvrdaLozinka"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                        value={values.potvrdaLozinka}
                        onChange={handleChange}
                        onBlur={handleBlur}
                          />
                           {touched.potvrdaLozinka && errors.potvrdaLozinka && <div>{errors.potvrdaLozinka}</div>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="adresa">
                        <Form.Label className="text-center">Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address"
                        value={values.adresa}
                        onChange={handleChange}
                        onBlur={handleBlur}
                          />
                           {touched.adresa && errors.adresa && <div>{errors.adresa}</div>}
                      </Form.Group>

                      <Form.Group controlId="datumRodjenja">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={values.datumRodjenja}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                         {touched.datumRodjenja && errors.datumRodjenja && <div>{errors.datumRodjenja}</div>}
                      </Form.Group>

                      <Form.Group controlId="tip">
                        <Form.Label>User Role</Form.Label>
                        <Form.Control
                          as="select"
                          value={values.tip}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         
                        >
                          <option value="0">Customer</option>
                          <option value="1">Seller</option>
                        </Form.Control>
                        {touched.tip && errors.tip && <div>{errors.tip}</div>}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{' '}
                        <a href="{''}" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    );
}

export default Register;
