import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { CLEAR_ERROR, AUTH_ERROR } from "../../constants/actionTypes";

import * as api from "../../api";

import img from "../../images/laptop.webp";
import laptopSideways from "../../images/laptopSideways.png";
import { ReactComponent as Cpu } from "../../images/cpu.svg";
import { ReactComponent as Gpu } from "../../images/gpu.svg";
import { ReactComponent as Ssd } from "../../images/ssd.svg";
import { ReactComponent as Ram } from "../../images/ram.svg";

import "./styles.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import Footer from "../Footer/Footer.component";

import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";

const theme = sessionStorage.getItem("theme");
const oppositeTheme = theme === "dark" ? "light" : "dark";

function getAdditionalInfo(info) {
  if (info) {
    return Object.entries(info).map(([key_, value_]) => {
      return (
        <Card className='shadow-sm info-card' key={key_} bg={theme} text={oppositeTheme}>
          <Card.Body>
            <Row className='p-2'>
              <Col>
                <Card.Text>
                  <span className='fs-5 fw-bold'>{key_}:</span>
                </Card.Text>
              </Col>
              <Col className='text-end'>
                <Card.Text>
                  <span className='lead'>{value_}</span>
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });
  }
}

function ProductShowcase() {
  const [data, setData] = useState(null);
  const [isProductLiked, setIsProductLiked] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const error = useSelector((state) => state.auth.errors);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await api.fetchProductData(params.id).then((res) => setData(res.data));
    };
    fetchData();
  }, [params.id]);

  const addProductToCart = async () => {
    await api
      .addProductToCart({ productId: params.id })
      .then((data) => {
        setIsProductInCart((e) => !e);
      })
      .catch((err) =>
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.message || "Internal server error",
        })
      );
  };

  const likeProduct = async () => {
    await api
      .handleLikedList({ productId: params.id })
      .then((data) => {
        setIsProductLiked((e) => !e);
      })
      .catch((err) =>
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.message || "Internal server error",
        })
      );
  };

  if (!data) return null;
  return (
    <React.Fragment>
      <Alert
        role='alert'
        variant={`${theme === "dark" ? "dark" : "danger"}`}
        className='alert_ fs-5 d-flex align-items-center justify-content-center'
        show={error}
        dismissible
        onClose={() => dispatch({ type: CLEAR_ERROR, payload: null })}>
        <span>
          <AiOutlineExclamationCircle size='30' />
          &nbsp;&nbsp;&nbsp;{error}
        </span>
      </Alert>
      <Container fluid='lg' className='pb-5'>
        <Row>
          <Col lg={6} md={4} className='d-flex justify-content-center align-items-center'>
            <Image src={img} fluid alt='product image' />
          </Col>
          <Col lg={6} md={8}>
            <Container>
              <Row className='row my-5 g-0 align-items-center justify-content-center'>
                <Col className='mt-5'>
                  <h1 className='display-4'>{data.name}</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Code: {data.code ? data.code : "No data"}</span>
                </Col>
                <Col className='text-end'>
                  <span>Availability: </span>
                  {data.available !== undefined ? (
                    data.available === true ? (
                      <span className='text-success'>In Stock</span>
                    ) : (
                      <span className='text-danger'>Out of stock</span>
                    )
                  ) : (
                    <span>No data</span>
                  )}
                </Col>
              </Row>
              {data.available && (
                <Row className=' mt-2 text-end'>
                  <p>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='36'
                      height='36'
                      fill='currentColor'
                      className='bi bi-truck text-success me-2'
                      viewBox='0 0 16 16'>
                      <path d='M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
                    </svg>
                    Free Domestic Delivery
                  </p>
                </Row>
              )}

              <Row className='mt-2'>
                <p className='fs-4 text-primary'>Description</p>
                <p className='fs-5 lead'>{data.description ? data.description : "No data"}</p>
              </Row>
              <Row>
                <Col>
                  <span className='fs-3'>Price: </span>
                  <span className='fs-2 text-primary'>
                    {data.priceWhole}.<sup className='fw-light fs-5'>{data.priceDecimal}</sup>
                    <span className='fs-4'> BGN</span>
                  </span>
                </Col>
                <Col className='col'>
                  <span className='clickable' onClick={likeProduct}>
                    {isProductLiked ? (
                      <RiHeartFill className='me-3' size={32} />
                    ) : (
                      <RiHeartLine className='me-3' size={32} />
                    )}
                  </span>
                  <Button onClick={addProductToCart} variant='primary' size='lg' className='w-75'>
                    {isProductInCart ? "Remove from cart" : "Add to cart"} &nbsp;
                    <svg
                      width='20'
                      height='20'
                      fill='currentColor'
                      className='bi bi-cart2 ms-2 mb-1'
                      viewBox='0 0 16 16'>
                      <path d='M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z' />
                    </svg>
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container className='pt-2'>
        <Row>
          <p className='fs-4 text-primary fw-bold'>Specifications:</p>
        </Row>
        <Row>
          <Col md={3} className='text-center'>
            <Cpu />
            <p className='mt-2 lead'>{data.shortInfo?.CPU ? data.shortInfo?.CPU : "No data"}</p>
          </Col>
          <Col md={3} className='text-center'>
            <Gpu />
            <p className='mt-2 lead'>{data.shortInfo?.GPU ? data.shortInfo?.GPU : "No data"}</p>
          </Col>
          <Col md={3} className='text-center'>
            <Ssd />
            <p className='mt-2 lead'>{data.shortInfo?.SSD ? data.shortInfo?.SSD : "No data"}</p>
          </Col>
          <Col md={3} className='text-center'>
            <Ram />
            <p className='mt-2 lead'>{data.shortInfo?.RAM ? data.shortInfo?.RAM : "No data"}</p>
          </Col>
        </Row>
        <Row className='my-5'>
          <Col lg='6' md={12}>
            <Row className='g-3'>{getAdditionalInfo(data.longInfo)}</Row>
          </Col>
          <Col lg={6} className='d-flex justify-content-end align-items-center'>
            <Image fluid src={laptopSideways} alt='product image'></Image>
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default ProductShowcase;
