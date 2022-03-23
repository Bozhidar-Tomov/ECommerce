import React from "react";
import OK from "../../images/check.svg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

function PaymentSuccess() {
  return (
    <Container fluid='sm' className='my-5 px-4'>
      <Row className='justify-content-center text-center my-4'>
        <Card className='shadow-lg border border-success  border-2 p-4' style={{ width: "50rem" }}>
          <Row className='justify-content-center text-center my-4'>
            <Image variant='top' src={OK} style={{ width: "128px", height: "128px" }} />
          </Row>
          <Card.Title>
            <p className='display-4 my-3 text-center'>Payment Successful!</p>
          </Card.Title>
          <Card.Text>done</Card.Text>
        </Card>
      </Row>
    </Container>
  );
}

export default PaymentSuccess;
