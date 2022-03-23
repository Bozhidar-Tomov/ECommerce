import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { AiOutlineExclamationCircle } from "react-icons/ai";

function PaymentCancel() {
  return (
    <Container fluid='sm' className='my-5 px-4'>
      <Row className='justify-content-center text-center my-4'>
        <Card className='shadow-lg border border-danger  border-2 p-4' style={{ width: "50rem" }}>
          <Row className='justify-content-center text-center my-4'>
            <AiOutlineExclamationCircle size='110px' className='text-danger' />
          </Row>
          <Card.Title>
            <p className='display-5 my-3 text-center'>Payment has been Cancelled!</p>
          </Card.Title>
        </Card>
      </Row>
    </Container>
  );
}

export default PaymentCancel;
