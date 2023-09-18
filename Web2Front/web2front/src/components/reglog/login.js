import React, { useContext, useEffect, useState }  from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import * as Yup from "yup";
import { userLogin, userLoginGoogle } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';


function Login() {
  const navigate = useNavigate();
  const {setAuthToken,removeToken} = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
   

    const formData = {
      emailAdresa: userObject.email,
      ime: userObject.given_name,
      prezime: userObject.family_name,
      kIme: userObject.email,
      lozinka: "somedummy98/A",
      potvrdaLozinka: "somedummy98/A",
      datumRodjenja: new Date().toISOString(),
      adresa: "/",
      tip: 0,
      slika:userObject.picture,
      status:0,
    }



    handleGoogleLogin(formData);
  }
  useEffect(() => {
    removeToken();

    /* global google */
    google.accounts.id.initialize({
      client_id:
        "171900610121-mp9b0s8u9758533vrjnkje8vgh0nfl79.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  });

  const handleGoogleLogin = async (formData) => {
    const response = await userLoginGoogle(formData);
    const data = await response.json();

    if (response.ok) {
      const decodedToken = jwt_decode(data.token);

      setAuthToken(data.token); 

      const { Role } = decodedToken;

      if (Role == 2) {
        navigate("/admin-dashboard");
      } else if (Role == 1) {
        navigate("/seller-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } else if (response.status === 400) {
      setError("Incorrect username or password.");
    } else {
      console.log(data.statusCode);
    }
  };

  const validationSchema = Yup.object({
    korisnickoIme: Yup.string().required("Username is required"),
    lozinka: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      korisnickoIme: "",
      lozinka: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await userLogin(values.korisnickoIme, values.lozinka);
      const data = await response.json();
      if(response.ok){
        const decodedToken = jwt_decode(data.token)
        setAuthToken(data.token)
        const {Role} = decodedToken;
        if (Role == 2){
          navigate("/admin-dashboard")
        }else if (Role == 1){
          navigate("/seller-dashboard")
        }else{
          navigate("/customer-dashboard")
        }
      } else if (response.status === 400){
        setError("Incorrect username or password.")
      }else{
        console.log(data.statusCode)
      }
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
                    <Form.Group className="mb-3" controlId="korisnickoIme">
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"
                         value={values.korisnickoIme}
                         onChange={handleChange}
                         onBlur={handleBlur} />
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
                      </Form.Group>
 

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="w-60 mx-auto d-block">
                      <div id="signInDiv"></div>
                    </div>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Dont have an account?{' '}
                        <a href="/register" className="text-primary fw-bold">
                          Register
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

export default Login;
