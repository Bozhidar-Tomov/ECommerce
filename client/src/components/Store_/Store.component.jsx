import React, { useEffect, useState } from "react";

import * as api from "../../api";

import "./styles.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Product from "./Product/Product.component";
import Pagination from "react-bootstrap/Pagination";
import Footer from "../Footer/Footer.component";
import Alert from "react-bootstrap/Alert";

function Store() {
  console.log("rendering");
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
  const items = [];

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api
          .fetchProductData()
          .then((res) => {
            setProducts(res.data);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  function getProducts() {
    return currentProducts.map((product) => {
      return (
        <Product
          key={product?._id}
          title={product?.title}
          info={product?.shortInfo}
          priceWhole={product?.priceWhole}
          priceDecimal={product?.priceDecimal}
          _id={product?._id}
        />
      );
    });
  }

  for (let i = 1; i <= Math.ceil(products?.length / productsPerPage); i++) {
    items.push(
      <Pagination.Item onClick={() => setCurrentPage(i)} key={i} active={i === currentPage}>
        {i}
      </Pagination.Item>
    );
  }

  if (products?.length === 0) {
    return (
      <Container className='no-products'>
        <Alert variant='secondary' className='text-center'>
          {" "}
          No products available for this category{" "}
        </Alert>
      </Container>
    );
  }
  if (!products) return null;
  return (
    <React.Fragment>
      <Container>
        <Row className='text-center my-5'>
          <p className='display-5'>
            Category: <span className='text-primary'>laptops</span>
          </p>
        </Row>
        <Row className='g-4 my-auto'>{getProducts()}</Row>
        <Row className='mt-5'>
          <Pagination className='justify-content-center'>{items}</Pagination>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default Store;
