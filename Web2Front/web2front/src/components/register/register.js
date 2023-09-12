import React, { useEffect, useState }  from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";



function Register() {

  const validationSchema = Yup.object({
    email:Yup.string()
        .email("Incorrect email format")
        .required("Email is required"),
    name: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Last name is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
        .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and it must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character."
    ),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords are not matching").required("Password confirmation is required"),
    dateOfBirth: Yup.string().required("date of birth is required"),
    address: Yup.string().required("Address is required"),
    type: Yup.string().required("User type is required"),      
})

  const formik = useFormik({
  initialValues: {
      email: "",
      name: "",
      lastName: "",
      userName: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
    type: "",
  },
  validationSchema,
  onSubmit: (values) => {
    // Implementiraj logiku za slanje podataka na server
    console.log(values);
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
                    <Form>
                    <Form.Group className="mb-3" controlId="userName">
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />  
                         {touched.userName && errors.userName && <div>{errors.userName}</div>}
                      </Form.Group>
                      

                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name"
                         value={values.name}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         />   
                             {touched.name && errors.name && <div>{errors.name}</div>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label className="text-center">Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter LastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         />
                          {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />  
                                 {touched.email && errors.email && <div>{errors.email}</div>}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="password"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         />
                          {touched.password && errors.password && <div>{errors.password}</div>}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="confirmPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                          />
                           {touched.confirmPassword && errors.confirmPassword && <div>{errors.confirmPassword}</div>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="address">
                        <Form.Label className="text-center">Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                          />
                           {touched.address && errors.address && <div>{errors.address}</div>}
                      </Form.Group>

                      <Form.Group controlId="dateOfBirth">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={values.dateOfBirth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                         {touched.dateOfBirth && errors.dateOfBirth && <div>{errors.dateOfBirth}</div>}
                      </Form.Group>

                      <Form.Group controlId="type">
                        <Form.Label>User Role</Form.Label>
                        <Form.Control
                          as="select"
                          value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         
                        >
                          <option value="0">Customer</option>
                          <option value="1">Seller</option>
                        </Form.Control>
                        {touched.type && errors.type && <div>{errors.type}</div>}
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
