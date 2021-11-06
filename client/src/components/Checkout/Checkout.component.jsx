import React, { useState, useEffect } from "react";

import "./styles.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import VISA from "../../images/visa.svg";
import MASTERCARD from "../../images/mastercard.svg";
import PAYPAL from "../../images/paypal.svg";
import Footer from "../Footer/Footer.component";

import { Formik } from "formik";
import * as api from "../../api";

import { useDispatch, useSelector } from "react-redux";
import { validateCode } from "../../actions/promoCode";

function Checkout(props) {
  const [data, setData] = useState([null]);
  const codeData = useSelector((state) => state.promoCode);
  const dispatch = useDispatch();

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      await api.fetchProductData(props.match.params.id).then((res) => setData(res.data));
    };
    fetchData();
  }, [props.match.params.id]);

  function calculateDiscount(typeDiscount, discountAmount) {
    console.log(typeDiscount, discountAmount);
    if (typeDiscount === "percentage") {
      console.log("price: ", data.price);
      return (discountAmount * 0.01 * data.price).toFixed(2);
    }
    if (typeDiscount === "fixedAmount") {
      return (data.price - discountAmount).toFixed(2);
    }
    return (0).toFixed(2);
  }

  return (
    <React.Fragment>
      <Container fluid='md' className='mt-3'>
        <p className='display-3 text-primary text-center'>CHECKOUT</p>
        <Row>
          <Col md={8}>
            <Formik
              onSubmit={async (formData) => {
                console.log(formData);
              }}
              initialValues={{}}>
              {({ handleSubmit, handleChange, handleReset, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <h4 className='mb-3'>Billing address</h4>
                  <Card className='shadow-sm border-primary p-5 mt-3 mb-4 border-2'>
                    <Row className='mb-3'>
                      <Form.Group as={Col} controlId='formGridEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' />
                      </Form.Group>

                      <Form.Group as={Col} controlId='formGridPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' />
                      </Form.Group>
                    </Row>

                    <Form.Group className='mb-3' controlId='formGridAddress1'>
                      <Form.Label>Address</Form.Label>
                      <Form.Control placeholder='1234 Main St' />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formGridAddress2'>
                      <Form.Label>Address 2</Form.Label>
                      <Form.Control placeholder='Apartment, studio, or floor' />
                    </Form.Group>

                    <Row className='mb-3'>
                      <Form.Group as={Col} controlId='formGridCity'>
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                      </Form.Group>

                      <Form.Group as={Col} controlId='formGridState'>
                        <Form.Label>State</Form.Label>
                        <Form.Select defaultValue='Choose...'>
                          <option>Choose...</option>
                          <option>...</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group as={Col} controlId='formGridZip'>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                      </Form.Group>
                    </Row>

                    <Form.Group className='mb-3' id='formGridCheckbox'>
                      <Form.Check type='checkbox' label='Agree to Terms and Conditions' />
                    </Form.Group>
                  </Card>

                  <h4>Payment method</h4>
                  <Card className='px-2 py-3 my-3 shadow-sm'>
                    <Row className='justify-content-center'>
                      <Col>
                        <Form.Check type='radio' id='VISA'>
                          <Form.Check.Label>
                            <Form.Check.Input
                              name='payment-methods'
                              type='radio'></Form.Check.Input>
                            <Image src={VISA} alt='VISA'></Image>
                          </Form.Check.Label>
                        </Form.Check>
                      </Col>
                      <Col>
                        <Form.Check type='radio' id='MASTERCARD'>
                          <Form.Check.Label>
                            <Form.Check.Input
                              name='payment-methods'
                              type='radio'></Form.Check.Input>

                            <Image src={MASTERCARD} alt='MASTERCARD'></Image>
                          </Form.Check.Label>
                        </Form.Check>
                      </Col>
                      <Col>
                        <Form.Check type='radio' id='PAYPAL'>
                          <Form.Check.Label>
                            <Form.Check.Input
                              name='payment-methods'
                              type='radio'></Form.Check.Input>

                            <Image src={PAYPAL} alt='PayPal'></Image>
                          </Form.Check.Label>
                        </Form.Check>
                      </Col>
                    </Row>
                  </Card>
                  <Button size='lg' variant='primary' className='w-100' type='submit'>
                    Continue to checkout
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
          <Col md={4} className='mb-4'>
            <h4 className='d-flex justify-content-between align-items-center mb-3'>
              <span>Your cart</span>
              <Badge pill bg='primary'>
                1
              </Badge>
            </h4>
            <Card className='px-2 py-1 my-3 shadow-sm'>
              <ul className='list-group list-group-flush mb-3'>
                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>{data.name}</h6>
                    <small className='text-muted'>{data.category}</small>
                  </div>
                  <span>{data.price} BGN</span>
                </li>
                <li className='list-group-item d-flex justify-content-between bg-light'>
                  <div className='text-success'>
                    <h6 className='my-0'>Promo code</h6>
                    <small>
                      {codeData.result?.result.name ? codeData.result?.result.name : "NONE"}
                    </small>
                  </div>
                  <span className='text-success'>
                    -
                    {calculateDiscount(
                      codeData.result?.result.typeDiscount,
                      codeData.result?.result.discountAmount
                    )}{" "}
                    BGN
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                  <span>Total (BGN)</span>
                  <strong>
                    {data.price -
                      calculateDiscount(
                        codeData.result?.result.typeDiscount,
                        codeData.result?.result.discountAmount
                      )}{" "}
                    BGN
                  </strong>
                </li>
              </ul>
            </Card>

            <Card className='p-2 shadow-sm'>
              <Formik
                onSubmit={async (formData) => {
                  dispatch(validateCode(formData));
                }}
                initialValues={{
                  code: "",
                }}>
                {({ handleSubmit, handleChange, values }) => (
                  <Form onSubmit={handleSubmit}>
                    <InputGroup hasValidation>
                      <Form.Control
                        name='code'
                        placeholder='Promo code'
                        value={values.code}
                        onChange={handleChange}
                        isValid={codeData.result}
                        isInvalid={codeData.errors}
                        required
                      />
                      <Button type='submit' variant='secondary'>
                        Redeem
                      </Button>
                      <Form.Control.Feedback type={codeData.errors ? "invalid" : "valid"}>
                        {codeData.errors ? codeData?.errors : codeData.result?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form>
                )}
              </Formik>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default Checkout;
