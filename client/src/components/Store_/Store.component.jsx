import React, { useEffect, useState } from "react";

import "./styles.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Product from "./Product/Product.component";
import Footer from "../Footer/Footer.component";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

function Store() {
  const [product, setProduct] = useState([null]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:5000/products/")
          .then((res) => {
            setProduct(res.data);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  function getProducts() {
    return product.map((current) => {
      return (
        <Product
          key={current?._id}
          title={current?.title}
          info={current?.shortInfo}
          price={current?.price}
          _id={current?._id}
        />
      );
    });
  }
  if (product.length === 0) {
    return (
      <Container className='no-products'>
        <Alert variant='secondary' className='text-center'>
          {" "}
          No products available for this category{" "}
        </Alert>
      </Container>
    );
  }
  return (
    <>
      <Container>
        <Row className='text-center my-5'>
          <p className='display-5'>
            Category: <span className='text-primary'>laptops</span>
          </p>
        </Row>
        <Row className='g-4 my-auto'>{getProducts()}</Row>
      </Container>
      <Footer />
    </>
  );
}

export default Store;
