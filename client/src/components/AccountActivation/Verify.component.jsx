import React, { useEffect } from "react";

import emailCheck from "../../images/check-email.svg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";

import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";

import { sendVerificationEmail } from "../../actions/auth";

function Verify() {
  let count = 0;
  const user = JSON.parse(
    localStorage.getItem("profile")
      ? localStorage.getItem("profile")
      : sessionStorage.getItem("profile")
  );
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    console.log("run");
    dispatch(sendVerificationEmail(userInfo));
  });
  function resendEmail() {
    if (count < 5) {
      console.log("resent!");
      dispatch(sendVerificationEmail(userInfo));
      count++;
    }
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <Container fluid='sm' className='my-5 px-4'>
      <Row className='justify-content-center text-center my-4'>
        <Card className='shadow-lg border border-primary border-2 p-4' style={{ width: "50rem" }}>
          <Row className='justify-content-center text-center'>
            <Image variant='top' src={emailCheck} style={{ width: "190px", height: "190px" }} />
          </Row>

          <Card.Title className='display-4 mb-3 text-center'>Verify your email</Card.Title>
          <Card.Text className='fs-4 lead px-2 text-start my-3'>
            We have sent an email to <b>{userInfo?.email || "your email"}</b> to verify your email
            address.
            <br />
            If you have not received an email in few minutes, please check your <b>spam</b> folder
            or you can click the button below. Thank you!
            <br />
          </Card.Text>
          <Col className='justify-content-center mt-2'>
            <Button size='lg' variant='primary' onClick={resendEmail}>
              Resend email
            </Button>
          </Col>
        </Card>
      </Row>
    </Container>
  );
}

export default Verify;
