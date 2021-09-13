import { Formik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { BsPersonLinesFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

//TODO: Country validation

const schema = yup.object().shape({
  firstName: yup.string().max(40, "Must be 40 characters or less.").required(),
  lastName: yup.string().max(40, "Must be 40 characters or less.").required(),
  email: yup.string().email("Invalid email").required(),
  country: yup.string().required(),
  password: yup
    .string()
    .min(8, "Password must be between 8 and 40 characters")
    .max(40, "Password must be between 8 and 40 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password does not match")
    .required(),
});
const isSignUp = true;
const showPass = true;
const setShowPass = () => {};
const setsSignUp = () => {};
return (
  <Formik
    validationSchema={schema}
    onSubmit={(values) => console.log(values)}
    initialValues={{
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    }}>
    {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
      <Form onSubmit={handleSubmit}>
        <Container fluid='md'>
          {isSignUp && (
            <Row>
              <Form.Group as={Col} md={6} className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>
                    <BsPersonLinesFill />
                  </InputGroup.Text>
                  <Form.Control
                    name='firstName'
                    type='text'
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !!errors.firstName}
                    placeholder='John'
                  />
                </InputGroup>
                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6} className='mb-3' controlId='last-name'>
                <Form.Label>Last Name</Form.Label>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>
                    <BsPersonLinesFill />
                  </InputGroup.Text>
                  <Form.Control
                    name='lastName'
                    type='text'
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !!errors.lastName}
                    placeholder='Smith'
                  />
                </InputGroup>
                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
          )}
          <Row>
            <Form.Group as={Col} md={6} className='mb-3' controlId='email-address'>
              <Form.Label>Email</Form.Label>
              <InputGroup className='mb-2'>
                <InputGroup.Text className='fw-bold'>@</InputGroup.Text>
                <Form.Control
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !!errors.email}
                  placeholder='JohnSmith@service.com'
                />
              </InputGroup>
              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
            </Form.Group>

            {isSignUp && (
              <Form.Group as={Col} md={6} className='mb-3' controlId='Country'>
                <Form.Label>Country</Form.Label>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>
                    <FaMapMarkerAlt />
                  </InputGroup.Text>
                  <Form.Select defaultValue={null}>
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            )}
          </Row>
          <Row>
            <Form.Group as={Col} md={6} className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <InputGroup className='mb-2'>
                <InputGroup.Text>
                  <CgPassword />
                </InputGroup.Text>
                <Form.Control
                  name='password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !!errors.password}
                  placeholder='Password'
                />
              </InputGroup>
              <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
            </Form.Group>
            {isSignUp && (
              <Form.Group as={Col} md={6} className='mb-3' controlId='confirm-password'>
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>
                    <CgPassword />
                  </InputGroup.Text>
                  <Form.Control
                    name='confirmPassword'
                    type={showPass ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isValid={touched.confirmPassword && !!errors.confirmPassword}
                    placeholder=' Confirm Password'
                  />
                  <Button variant='outline-secondary' onClick={() => setShowPass((e) => !e)}>
                    {showPass ? <BiHide /> : <BiShow />}
                  </Button>
                </InputGroup>
                <Form.Control.Feedback type='invalid'>
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Row>
          <Row className=' mt-3'>
            <Col md={2}>
              <Form.Check
                className='ms-3'
                type='checkbox'
                label='Remember me'
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className='text-center mt-1'>
              <Button className='w-100 my-4' type='submit'>
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </Col>

            <Col md={{ span: 4, offset: 2 }} className='text-center mt-2'>
              <button
                type='button'
                className='switch-btn w-100 my-4 text-muted text-end'
                onClick={() => setsSignUp((e) => !e)}>
                {isSignUp ? "ALREADY HAVE AN ACCOUNT? Sign In" : "DON'T HAVE AN ACCOUNT? SIGN UP"}
              </button>
            </Col>
          </Row>
        </Container>
      </Form>
    )}
  </Formik>
);
