import React, { useState, useEffect } from "react";
import OK from "../../images/check.svg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import Image from "react-bootstrap/Image";
import * as api from "../../api/index";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";

function ActivationStatus(props) {
  console.log("rendering");
  const [state, setState] = useState(null);
  useEffect(() => {
    async function verifyEmail() {
      await api
        .verifyEmail(props.match.params.token)
        .then((res) => {
          setState(() => ({ response: res.data, status: res.status }));
        })
        .catch((error) => {
          setState(() => ({ response: error.response.data, status: error.response.status }));
        });
    }
    verifyEmail();
  }, [props.match.params.token]);

  console.log(state);
  if (!state) return <div>Loading ...</div>;
  return (
    <Container fluid='sm' className='my-5 px-4'>
      <Row className='justify-content-center text-center my-4'>
        <Card
          className={`shadow-lg border border-${
            state.status === 200 ? "success" : state.status === 409 ? "secondary" : "danger"
          } border-2 p-4`}
          style={{ width: "50rem" }}>
          <Row className='justify-content-center text-center my-4'>
            {state.status === 200 ? (
              <Image variant='top' src={OK} style={{ width: "128px", height: "128px" }} />
            ) : state.status === 409 ? (
              <AiOutlineInfoCircle size='128px' />
            ) : (
              <AiOutlineExclamationCircle size='128px' />
            )}
          </Row>

          <Card.Title>
            <p className='display-4 my-3 text-center'>{state.response.title}</p>
          </Card.Title>
          <Card.Text>
            <p className='fs-4 lead px-2 text-start mt-2 text-center'>
              {state.response.description}
              <br />
            </p>
          </Card.Text>
          {state.status === 401 && (
            <Col className='justify-content-center'>
              <Button size='lg' variant='primary'>
                Resend email
              </Button>
            </Col>
          )}
        </Card>
      </Row>
    </Container>
  );
}

export default ActivationStatus;
