import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import "./styles.css";

import { GoogleLogin } from "react-google-login";

import { CLEAR_ERROR } from "../../constants/actionTypes";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { BsPersonLinesFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { ImGoogle } from "react-icons/im";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { Formik } from "formik";
import * as yup from "yup";

import countries from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../../actions/auth";

import ReCAPTCHA from "react-google-recaptcha";
import background from "../../images/auth-background.svg";

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
  console.log("rendering");
  const user = JSON.parse(
    localStorage.getItem("profile")
      ? localStorage.getItem("profile")
      : sessionStorage.getItem("profile")
  );
  const theme = sessionStorage.getItem("theme");
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const error = useSelector((state) => state.auth.errors);
  const [isSignUp, setSignUp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [userGeoId, setUserGeoId] = useState(sessionStorage.getItem("userGeoId"));
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const recaptchaRef = useRef();

  const googleSuccess = async (res) => {
    const result = res.profileObj;
    const googleToken = res.tokenId;

    const formData = {
      firstName: result.givenName,
      lastName: result.familyName,
      email: result.email,
      country: userGeoId[1],
      password: result.googleId,
      confirmPassword: result.googleId,
      //FIXME: cannot get and send rememberMe
      rememberMe: false,
    };

    const recaptchaToken = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    if (isSignUp) {
      dispatch(signup({ ...formData, recaptchaToken, googleToken, ip: userGeoId[1] }, history));
    } else {
      dispatch(signin({ ...formData, recaptchaToken, googleToken, ip: userGeoId[1] }, history));
    }
  };

  const googleFailure = (err) => {
    console.log("google unsuccessful", err);
  };

  useEffect(() => {
    async function getLocation() {
      if (!userGeoId) {
        await fetch("https://ipapi.co/json/")
          .then((response) => response.json())
          .then((data) => {
            sessionStorage.setItem("userGeoId", [data.country_name, data.ip]);
            setUserGeoId([data.country_name, data.ip]);
          });
      }
    }
    setIsLoading(false);
    getLocation();
  }, [error, userGeoId]);

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
      return null;
    });
  }

  if (user) {
    return <Navigate to='/' />;
  }

  if (!userGeoId) return null;

  return (
    <React.Fragment>
      <Alert
        role='alert'
        variant={`${theme === "dark" ? "dark" : "danger"}`}
        className='alert_ fs-5 d-flex align-items-center justify-content-center'
        show={error}
        dismissible
        onClose={() => dispatch({ type: CLEAR_ERROR, payload: null })}>
        <span>
          <AiOutlineExclamationCircle size='30' />
          &nbsp;&nbsp;&nbsp;{error}
        </span>
      </Alert>

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_SITE_KEY}
        size='invisible'
        badge='bottomright'
        ref={recaptchaRef}
        theme={theme}
      />

      <div className='my-5 mx-md-5 p-2 d-flex justify-content-md-start justify-content-center align-items-center'>
        <Card
          className='n shadow-lg border border-primary border-2'
          bg={theme}
          text={oppositeTheme}>
          <Card.Title className='text-primary text-center my-4'>
            <h3>{isSignUp ? "Sign Up" : "Sign In"}</h3>
          </Card.Title>
          <Card.Body>
            <Formik
              validationSchema={isSignUp ? schemaSignUp : schemaSignIn}
              onSubmit={async (formData) => {
                const recaptchaToken = await recaptchaRef.current.executeAsync();
                recaptchaRef.current.reset();

                dispatch({ type: CLEAR_ERROR });
                setIsLoading(true);

                if (isSignUp) {
                  dispatch(signup({ ...formData, recaptchaToken, ip: userGeoId[1] }, history));
                } else {
                  dispatch(signin({ ...formData, recaptchaToken, ip: userGeoId[1] }, history));
                }
              }}
              initialValues={{
                firstName: "rrr",
                lastName: "ttt",
                email: "w@w.d",
                country: "r",
                password: "asdfghas",
                confirmPassword: "asdfghas",
                rememberMe: false,
              }}>
              {({ handleSubmit, handleChange, handleReset, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Container fluid='md'>
                    {isSignUp && (
                      <>
                        <p className='lead fs-2 '>Personal Info</p>
                        <Form.Group as={Col} className='mb-3 ps-4'>
                          <Form.Label>
                            First Name <span className='text-danger'>*</span>
                          </Form.Label>
                          <InputGroup hasValidation className='mb-2'>
                            <InputGroup.Text>
                              <BsPersonLinesFill />
                            </InputGroup.Text>
                            <Form.Control
                              className={`bg-${theme} text-${oppositeTheme}`}
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

                        <Form.Group as={Col} className='mb-3 ps-4' controlId='last-name'>
                          <Form.Label>
                            Last Name <span className='text-danger '>*</span>
                          </Form.Label>
                          <InputGroup hasValidation className='mb-2'>
                            <InputGroup.Text>
                              <BsPersonLinesFill />
                            </InputGroup.Text>
                            <Form.Control
                              className={`bg-${theme} text-${oppositeTheme}`}
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
                      </>
                    )}

                    {isSignUp && (
                      <>
                        <Form.Group as={Col} className='mb-3 ps-4' controlId='Country'>
                          <Form.Label>
                            Country <span className='text-danger '>*</span>
                          </Form.Label>
                          <InputGroup hasValidation className='mb-2 '>
                            <InputGroup.Text>
                              <FaMapMarkerAlt />
                            </InputGroup.Text>
                            <Form.Select
                              className={`bg-${theme} text-${oppositeTheme}`}
                              defaultValue={userGeoId[0]}
                              onChange={handleChange}>
                              {getCountries()}
                            </Form.Select>
                          </InputGroup>
                        </Form.Group>
                        <hr className='mt-5' />
                        <p className='lead fs-2 mb-3'>Account Info</p>
                      </>
                    )}

                    <Form.Group
                      as={Col}
                      className={`mb-3 ${isSignUp ? "ps-4" : ""}`}
                      controlId='email-address'>
                      <Form.Label>
                        Email <span className='text-danger '>*</span>
                      </Form.Label>
                      <InputGroup hasValidation className='mb-2'>
                        <InputGroup.Text className='fw-bold'>@</InputGroup.Text>
                        <Form.Control
                          className={`bg-${theme} text-${oppositeTheme}`}
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

                    <Form.Group
                      as={Col}
                      className={`mb-3 ${isSignUp ? "ps-4" : ""}`}
                      controlId='password'>
                      <Form.Label>
                        Password <span className='text-danger '>*</span>
                      </Form.Label>
                      <InputGroup hasValidation className='mb-2'>
                        <InputGroup.Text>
                          <CgPassword />
                        </InputGroup.Text>
                        <Form.Control
                          className={`bg-${theme} text-${oppositeTheme}`}
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
                      <Form.Group as={Col} className='mb-3 ps-4' controlId='confirm-password'>
                        <Form.Label>
                          Confirm Password <span className='text-danger '>*</span>
                        </Form.Label>
                        <InputGroup hasValidation className='mb-2'>
                          <InputGroup.Text>
                            <CgPassword />
                          </InputGroup.Text>
                          <Form.Control
                            className={`bg-${theme} text-${oppositeTheme}`}
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

                    {!isSignUp && (
                      <Row className=' mt-3'>
                        <Col>
                          <Form.Label hidden={true}>Remember me</Form.Label>
                          <Form.Check
                            name='rememberMe'
                            className='m-2'
                            type='checkbox'
                            label='Remember me'
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    )}

                    <hr className='my-5' />

                    <Row className='mt-2'>
                      <Button type='submit' disabled={isLoading}>
                        {!isLoading ? (
                          isSignUp ? (
                            "Sign Up"
                          ) : (
                            "Sign In"
                          )
                        ) : (
                          <React.Fragment>
                            <Spinner
                              as='span'
                              animation='border'
                              size='sm'
                              role='status'
                              aria-hidden='true'
                            />
                            <span> Loading... </span>
                          </React.Fragment>
                        )}
                      </Button>
                      <span className='fs-6 text-center'>OR</span>
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_ID}
                        render={(renderProps) => (
                          <Button
                            type='submit'
                            variant='outline-primary'
                            className='my-2'
                            onClick={renderProps.onClick}
                            onClickCapture={() => {
                              dispatch({ type: CLEAR_ERROR });
                            }}
                            disabled={renderProps.disabled || isLoading}>
                            <ImGoogle />
                            <span>{isSignUp ? " Sign Up " : " Sign In "}with Google</span>
                          </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                      />
                    </Row>
                    <Row className='mt-2'>
                      <button
                        className='switch-btn w-100 my-2 text-muted text-end'
                        type='button'
                        onClick={() => {
                          setSignUp((e) => !e);
                          dispatch({ type: CLEAR_ERROR, payload: null });
                          handleReset();
                        }}>
                        {isSignUp
                          ? "ALREADY HAVE AN ACCOUNT? SIGN IN"
                          : "DON'T HAVE AN ACCOUNT? SIGN UP"}
                      </button>
                    </Row>
                  </Container>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
        <img className='r' src={background} alt='background' aria-hidden='true' />
      </div>
    </React.Fragment>
  );
}

export default Auth;
