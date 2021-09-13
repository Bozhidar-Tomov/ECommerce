import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

import { GoogleLogin } from "react-google-login";

import { AUTH, ERROR } from "../../constants/actionTypes";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { BsPersonLinesFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { ImGoogle } from "react-icons/im";

import { Formik } from "formik";
import * as yup from "yup";

import countries from "countries-list";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signup, signin } from "../../actions/auth";

const { REACT_APP_GOOGLE_ID } = process.env;

const schemaSignUp = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(40, "Must be 40 characters or less.")
    .required(),
  lastName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(40, "Must be 40 characters or less.")
    .required(),
  email: yup.string().email("Invalid email").required(),
  country: yup.string().required(),
  password: yup
    .string()
    .min(8, "Password must be between 8 and 40 characters")
    .max(40, "Password must be between 8 and 40 characters")
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password does not match")
    .required(),
});
const schemaSignIn = yup.object().shape({
  email: yup.string().email("Invalid email").required(),
  password: yup
    .string()
    .min(8, "Password must be between 8 and 40 characters")
    .max(40, "Password must be between 8 and 40 characters")
    .required(),
});

function Auth() {
  const error = useSelector((state) => state.auth.errors);
  console.log("rendering");
  const [isSignUp, setsSignUp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, payload: { result, token } });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (err) => {
    console.log("google unsuccessful", err);
  };

  useEffect(() => {
    async function getLocation() {
      await fetch("https://ipapi.co/json/")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setLocation(data.country_name);
        });
    }
    getLocation();
  }, []);

  function getCountries() {
    return Object.keys(countries?.countries).map((code) => {
      const country = countries?.countries[code].name;
      if (countries.countries[code].continent === "EU") {
        return (
          <option key={country} value={country}>
            {country}
          </option>
        );
      }
      return <></>;
    });
  }
  if (!location) {
    return <></>;
  }

  return (
    <Container fluid='md' className='my-5'>
      <Alert role='alert' variant='danger' className='alert_ fs-5' show={error}>
        <span className='fw-bold ms-4'>Error: </span> {error}
      </Alert>

      <Card className=' shadow-lg border border-primary border-2 mt-2 '>
        <Card.Title className='text-primary text-center my-4'>
          <h3>{isSignUp ? "Sign Up" : "Sign In"}</h3>
        </Card.Title>
        <Card.Body>
          <Formik
            validationSchema={isSignUp ? schemaSignUp : schemaSignIn}
            onSubmit={(formData) => {
              if (isSignUp) {
                dispatch(signup(formData, history));
              } else {
                dispatch(signin(formData, history));
              }
            }}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              country: location,
              password: "",
              confirmPassword: "",
              rememberMe: false,
            }}>
            {({ handleSubmit, handleChange, handleReset, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit} className='form-outline form-white'>
                <Container fluid='md'>
                  {isSignUp && (
                    <Row>
                      <Form.Group as={Col} md={6} className='mb-3'>
                        <Form.Label>
                          First Name <span className='text-danger'>*</span>
                        </Form.Label>
                        <InputGroup hasValidation className='mb-2'>
                          <InputGroup.Text>
                            <BsPersonLinesFill />
                          </InputGroup.Text>
                          <Form.Control
                            name='firstName'
                            type='text'
                            value={values.firstName}
                            onChange={handleChange}
                            isInvalid={touched.lastName && !!errors.firstName}
                            placeholder='John'
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group as={Col} md={6} className='mb-3' controlId='last-name'>
                        <Form.Label>
                          Last Name <span className='text-danger '>*</span>
                        </Form.Label>
                        <InputGroup hasValidation className='mb-2'>
                          <InputGroup.Text>
                            <BsPersonLinesFill />
                          </InputGroup.Text>
                          <Form.Control
                            name='lastName'
                            type='text'
                            value={values.lastName}
                            onChange={handleChange}
                            isInvalid={touched.lastName && !!errors.lastName}
                            placeholder='Smith'
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Row>
                  )}
                  <Row>
                    <Form.Group as={Col} md={6} className='mb-3' controlId='email-address'>
                      <Form.Label>
                        Email <span className='text-danger '>*</span>
                      </Form.Label>
                      <InputGroup hasValidation className='mb-2'>
                        <InputGroup.Text className='fw-bold'>@</InputGroup.Text>
                        <Form.Control
                          name='email'
                          type='email'
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={touched.email && !!errors.email}
                          placeholder='JohnSmith@service.com'
                        />
                        <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {isSignUp && (
                      <Form.Group as={Col} md={6} className='mb-3 ' controlId='Country'>
                        <Form.Label>
                          Country <span className='text-danger '>*</span>
                        </Form.Label>
                        <InputGroup hasValidation className='mb-2 '>
                          <InputGroup.Text>
                            <FaMapMarkerAlt />
                          </InputGroup.Text>
                          <Form.Select defaultValue={location} onChange={handleChange}>
                            {getCountries()}{" "}
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    )}
                  </Row>
                  <Row>
                    <Form.Group as={Col} md={6} className='mb-3' controlId='password'>
                      <Form.Label>
                        Password <span className='text-danger '>*</span>
                      </Form.Label>
                      <InputGroup hasValidation className='mb-2'>
                        <InputGroup.Text>
                          <CgPassword />
                        </InputGroup.Text>
                        <Form.Control
                          name='password'
                          type='password'
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                          placeholder='Password'
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    {isSignUp && (
                      <Form.Group as={Col} md={6} className='mb-3' controlId='confirm-password'>
                        <Form.Label>
                          Confirm Password <span className='text-danger '>*</span>
                        </Form.Label>
                        <InputGroup hasValidation className='mb-2'>
                          <InputGroup.Text>
                            <CgPassword />
                          </InputGroup.Text>
                          <Form.Control
                            name='confirmPassword'
                            type={showPass ? "text" : "password"}
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                            placeholder=' Confirm Password'
                          />
                          <Button
                            variant='outline-secondary'
                            onClick={() => setShowPass((e) => !e)}>
                            {showPass ? <BiHide /> : <BiShow />}
                          </Button>
                          <Form.Control.Feedback type='invalid'>
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    )}
                  </Row>
                  <Row className=' mt-3'>
                    <Col md={2}>
                      <Form.Check
                        name='rememberMe'
                        className='ms-3'
                        type='checkbox'
                        label='Remember me'
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className='text-center mt-2'>
                      <Button className='w-100 my-1' type='submit'>
                        {isSignUp ? "Sign Up" : "Sign In"}
                      </Button>
                      <GoogleLogin
                        clientId={REACT_APP_GOOGLE_ID}
                        render={(renderProps) => (
                          <Button
                            variant='outline-primary'
                            className='w-100 my-1'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>
                            <ImGoogle />
                            <span>{isSignUp ? " Sign Up " : " Sign In "}with Google</span>
                          </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                      />
                    </Col>

                    <Col md={{ span: 4, offset: 2 }} className='text-center mt-2'>
                      <button
                        className='switch-btn w-100 my-4 text-muted text-end'
                        type='button'
                        onClick={() => {
                          setsSignUp((e) => !e);
                          dispatch({ type: ERROR, payload: null });
                          handleReset();
                        }}>
                        {isSignUp
                          ? "ALREADY HAVE AN ACCOUNT? SIGN IN"
                          : "DON'T HAVE AN ACCOUNT? SIGN UP"}
                      </button>
                    </Col>
                  </Row>
                </Container>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Auth;
