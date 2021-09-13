import React from "react";

import "./styles.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import VISA from "../../images/visa.svg";
import MASTERCARD from "../../images/mastercard.svg";
import PAYPAL from "../../images/paypal.svg";

function Checkout() {
  return (
    <React.Fragment>
      <Container className='mt-4'>
        <p class='display-3 text-primary text-center'>CHECKOUT</p>

        <Row>
          <Col lg={8}>
            <h2>Billing Address</h2>
            <Card className='shadow border-primary p-5 my-3 border-2'>
              <Form>
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
              </Form>
            </Card>
          </Col>
          <Col lg={4}>
            <h2>Your cart</h2>

            <Card className='px-2 py-1 my-3 shadow-sm'>
              <ul class='list-group list-group-flush'>
                <li class='list-group-item'>
                  <Row>
                    <Col xl={9}>
                      <span class='fw-bold'>Lenovo Ideapad 3 15TL</span>
                      <br />
                      <span class='text-muted'>laptop</span>
                    </Col>
                    <Col xl={3} class='text-end'>
                      1 099.99 BGN
                    </Col>
                  </Row>
                </li>
                <li class='list-group-item text-success'>
                  <Row>
                    <Col xl={9} class='fw-bold'>
                      <span>Promo Code</span>
                      <br />
                      <span>NONE</span>
                    </Col>

                    <Col xl={3} class='text-end'>
                      -0.00 BGN
                    </Col>
                  </Row>
                </li>
                <li class='list-group-item'>
                  <Row>
                    <Col xl={9} class='fw-bold'>
                      Total (BGN)
                    </Col>
                    <Col xl={3} class='text-end'>
                      1 099.99 BGN
                    </Col>
                  </Row>
                </li>
              </ul>
            </Card>
            <Card className='p-2'>
              <Form>
                <InputGroup>
                  <Form.Control placeholder='Promo code'></Form.Control>
                  <Button type='submit' variant='secondary'>
                    Redeem
                  </Button>
                </InputGroup>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className='my-4'>
          <Col lg={8}>
            <h2>Payment</h2>
            <Card className='px-2 py-3 my-3 shadow-sm'>
              <Row className='justify-content-center'>
                <Col>
                  <Form.Check type='radio' id='VISA'>
                    <Form.Check.Label>
                      <Form.Check.Input name='payment-methods' type='radio'></Form.Check.Input>
                      <Image src={VISA} alt='VISA'></Image>
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
                <Col>
                  <Form.Check type='radio' id='MASTERCARD'>
                    <Form.Check.Label>
                      <Form.Check.Input name='payment-methods' type='radio'></Form.Check.Input>

                      <Image src={MASTERCARD} alt='MASTERCARD'></Image>
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
                <Col>
                  <Form.Check type='radio' id='PAYPAL'>
                    <Form.Check.Label>
                      <Form.Check.Input name='payment-methods' type='radio'></Form.Check.Input>

                      <Image src={PAYPAL} alt='PayPal'></Image>
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Checkout;
