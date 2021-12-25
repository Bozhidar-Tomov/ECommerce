import React from "react";
import "./styles.css";
import laptop from "../../../images/laptop.webp";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

const theme = sessionStorage.getItem("theme");
const oppositeTheme = theme === "dark" ? "light" : "dark";

function getInfo(info) {
  if (!info) {
    return null;
  }

  return Object.entries(info).map(([key_, value_]) => {
    return (
      <React.Fragment key={key_}>
        <span>
          <b>{key_}: </b> {value_}
        </span>
        <br />
      </React.Fragment>
    );
  });
}

function Product(props) {
  return (
    <Col xl={3} lg={4} md={6} sm={12} key={props._id}>
      <Card className='card_ shadow p-3' bg={theme} text={oppositeTheme}>
        <img src={laptop} className='card-img-top' alt='' />
        <Card.Body>
          <Card.Title>
            <h5>{props.title}</h5>
          </Card.Title>
          <Card.Text className='text-muted'>{getInfo(props.info)}</Card.Text>
          <Card.Text className='fs-3 fw-bold'>
            {props.priceWhole}.<sup>{props.priceDecimal}</sup>
            <span className='fs-5'> BGN</span>
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
