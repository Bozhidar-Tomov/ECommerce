import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import NotFound from "../../images/NotFound.svg";

import "./styles.css";
import { Link } from "react-router-dom";

function PageNotFound() {
  const theme = sessionStorage.getItem("theme");
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  return (
    <Container fluid='sm' className='my-5 px-4'>
      <Row className='justify-content-center text-center'>
        <Card
          bg={theme}
          text={oppositeTheme}
          className={`shadow-lg border border-1 border-${oppositeTheme} rounded pb-3`}
          style={{ width: "50rem" }}>
          <Row className='justify-content-center text-center'>
            <Image variant='top' src={NotFound} className='px-5' />
          </Row>

          <Card.Title>
            <span className='display-5 my-3 text-center'>
              The page you were looking for doesn't exist.
            </span>
          </Card.Title>
          <Card.Text>
            <span className='fs-4 lead px-2 text-start mt-2 text-center'>
              You may have mistyped the address or the page may have been moved.
              <br />
            </span>
          </Card.Text>

          <Col className='justify-content-center'>
            <Button size='lg' variant='primary' as={Link} to={"/app"}>
              Go back
            </Button>
          </Col>
        </Card>
      </Row>
    </Container>
  );
}

export default PageNotFound;
