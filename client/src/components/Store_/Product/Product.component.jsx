import React from "react";

import "./styles.css";
import laptop from "../../../images/laptop.png";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

function getInfo(info) {
  if (info) {
    return Object.entries(info).map(([key_, value_]) => {
      return (
        <>
          <span>
            <b>{key_}: </b> {value_}
          </span>
          <br />
        </>
      );
    });
  }
}

function Product(props) {
  return (
    <Col xl={3} lg={4} md={6} sm={12}>
      <Card className='card_ shadow p-3'>
        <img src={laptop} className='card-img-top' alt='' />
        <Card.Body>
          <Card.Title>
            <h5>{props.title}</h5>
          </Card.Title>
          <Card.Text className='text-muted'>{getInfo(props?.info)}</Card.Text>
          <Card.Text className='fs-3 fw-bold'>
            {Math.trunc(props?.price)}.
            <sup>{Math.trunc((props?.price - Math.floor(props?.price)) * 100)}</sup>{" "}
            <span class='fs-5'> BGN</span>
          </Card.Text>
          <hr />
          <Link to={"/product/" + props._id} className='btn btn-primary'>
            View Product
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Product;
