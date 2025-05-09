import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

import Footer from "../Footer/Footer.component";

import { BsArrowRightCircleFill } from "react-icons/bs";

import { LOGOUT, LIKED_LIST, CART } from "../../constants/actionTypes";

import * as api from "../../api";
import { useNavigate } from "react-router";

import { FiTrash2 } from "react-icons/fi";
import { RiDislikeLine } from "react-icons/ri";
import Avatar from "react-avatar";
import { sendVerificationEmail } from "../../api";
import decode from "jwt-decode";

import "./styles.css";

function Dashboard() {
  console.info("render");
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [current, setCurrent] = useState(CART);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = sessionStorage.getItem("theme");
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [user] = useState(
    JSON.parse(
      localStorage.getItem("profile")
        ? localStorage.getItem("profile")
        : sessionStorage.getItem("profile")
    )
  );
  const decodedToken = user?.token ? decode(user.token) : null;

  useEffect(() => {
    async function fetch() {
      await api
        .fetchUserData()
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => console.error("error", error));
    }
    fetch();
  }, []);
  console.log(userData);

  async function removeItem(item) {
    await api
      .removeItemFromUserData({
        item,
        field: current === CART ? CART : current === LIKED_LIST ? LIKED_LIST : null,
      })
      .then(() => {
        let a = JSON.parse(JSON.stringify(userData));
        a[current] = a[current].filter((itemList) => itemList.id !== item);

        setUserData(a);
      })
      .catch((error) => console.error("error", error));
  }

  const Product = (props) => (
    <tr>
      <td className='clickable' onClick={() => navigate(`/product/${props.id}`)}>
        {props.name}
      </td>
      <td className='clickable' onClick={() => navigate(`/product/${props.id}`)}>
        {props.price}
      </td>
      <td>
        <Button variant='outline-danger' onClick={() => removeItem(props.id)}>
          {current === CART ? <FiTrash2 /> : <RiDislikeLine />}
        </Button>
      </td>
    </tr>
  );

  function productList() {
    return userData[current].map((product) => (
      <Product name={product.name} price={product.price} key={product.id} id={product.id} />
    ));
  }

  if (!userData) return <div>loading</div>;

  return (
    <>
      <Container className='mt-4 pb-5 pt-1'>
        <Row>
          <Col md={3} className='mt-2 mb-4'>
            <Row className='justify-content-center text-center'>
              <p className='fs-2 mt-2 mb-4 display-2'>Your Account</p>
              <span>
                <Avatar
                  name={decodedToken.name}
                  round={true}
                  src={decodedToken.imageUrl}
                  size='100'
                />
              </span>
              <p className='fs-4 lead'>
                <strong>{decodedToken.name}</strong>
              </p>
              {!userData.userInfo.isAccountValidated && (
                <OverlayTrigger
                  placement='right'
                  delay={{ show: 150, hide: 200 }}
                  overlay={<Tooltip>Click to activate</Tooltip>}>
                  <Badge
                    pill
                    className='fs-6 text-dark w-50 clickable'
                    bg='warning'
                    onClick={() => {
                      dispatch(
                        sendVerificationEmail({
                          name: decodedToken.name,
                          email: decodedToken.email,
                          userID: decodedToken.id,
                        }).then(
                          Swal.fire({
                            titleText: "Confirmation email has been sent!",
                            html: `<p>If you can't see the email, sent to <strong>${decodedToken.email}</strong>, check spam folder.</p>`,
                            icon: "success",
                            showConfirmButton: true,
                            background: theme === "dark" ? "#303030" : "#fcfcfc",
                            color: theme === "light" ? "#545454" : "#f3f3f3",
                          })
                        )
                      );
                    }}>
                    Not verified
                  </Badge>
                </OverlayTrigger>
              )}
            </Row>
            <hr />
            <Row className='fs-5 lead'>
              <p>
                Country: <strong>{userData.userInfo.country}</strong>
              </p>

              <div className='d-flex justify-content-between'>
                <p>
                  Email address: <strong>{userData.userInfo.email}</strong>
                </p>
              </div>

              <p>
                Account created:<strong> {userData.userInfo.createdAt}</strong>
              </p>
            </Row>
            <hr />
            <Row>
              <button
                onClick={() => {
                  Swal.fire({
                    titleText: "Are you sure you want to delete your account?",
                    html: "<p>This process is irreversible. All of your data will be deleted from our servers according to <a href='/terms-of-service' target='_blank'>Terms of Service</a></p>",
                    icon: "warning",
                    iconColor: "#dc3545",
                    background: theme === "dark" ? "#303030" : "#fcfcfc",
                    color: theme === "light" ? "#545454" : "#f3f3f3",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showCancelButton: true,
                    focusCancel: true,
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Yes, delete it",
                    confirmButtonColor: "#dc3545",
                  }).then(async (data) => {
                    if (data.isConfirmed) {
                      await api
                        .deleteUser()
                        .then(() => {
                          dispatch({ type: LOGOUT });
                          Swal.fire({
                            titleText: "Your account was successfully deleted!",
                            icon: "success",
                            background: theme === "dark" ? "#272727" : "#fcfcfc",
                            color: theme === "light" ? "#545454" : "#f3f3f3",
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            showConfirmButton: false,
                            timer: 3050,
                          }).then(navigate("/"));
                        })
                        .catch((error) => console.error(error));
                    }
                  });
                }}
                className='fs-5 text-danger switch-btn clickable'>
                Delete Account
              </button>
            </Row>
          </Col>
          <Col className='offset-md-2'>
            <Stack direction='horizontal' gap={3}>
              <Form.Check.Label className='w-100'>
                <Form.Check.Input
                  defaultChecked
                  onClick={() => setCurrent(CART)}
                  name='menus'
                  type='radio'></Form.Check.Input>
                <div
                  className={`p-3 bg-${theme} text-${oppositeTheme} shadow-sm d-flex  justify-content-around align-items-center rounded clickable`}>
                  <p className='fs-5'>Products in cart</p>
                  <h3 className='fs-2 text-primary'>{userData.cart.length}</h3>
                </div>
              </Form.Check.Label>

              <Form.Check.Label className='w-100'>
                <Form.Check.Input
                  onClick={() => setCurrent("likedList")}
                  name='menus'
                  type='radio'></Form.Check.Input>
                <div
                  className={`p-3 bg-${theme} text-${oppositeTheme} shadow-sm d-flex justify-content-around align-items-center rounded clickable`}>
                  <p className='fs-5'>Liked products</p>
                  <h3 className='fs-2 text-primary'>{userData.likedList.length}</h3>
                </div>
              </Form.Check.Label>

              <Form.Check.Label className='w-100'>
                <Form.Check.Input name='menus' type='radio'></Form.Check.Input>
                <div
                  className={`p-3 bg-${theme} text-${oppositeTheme} shadow-sm d-flex justify-content-around align-items-center rounded clickable`}>
                  <p className='fs-5'>Orders</p>
                  <h3 className='fs-2 text-primary'>dev</h3>
                </div>
              </Form.Check.Label>
            </Stack>

            <Row
              style={{ marginTop: "10vh" }}
              className='rounded border border-primary border-2 shadow'>
              <Table variant={theme} hover className='p-0 m-0'>
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Product Name</th>
                    <th style={{ width: "20%" }}>Price</th>
                    <th style={{ width: "20%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>{productList()}</tbody>
              </Table>
            </Row>
            {current === CART && userData.cart.length > 0 && (
              <Row>
                <Button
                  onClick={async () => {
                    setIsLoading(true);
                    await api
                      .checkout()
                      .then((e) => {
                        window.location = e.data;
                        setIsLoading(false);
                      })
                      .catch((err) => {
                        console.log("error:", err);
                        setIsLoading(false);
                      });
                  }}
                  size='lg'
                  variant='primary'
                  className='mt-5'>
                  {!isLoading ? (
                    <React.Fragment>
                      Checkout &nbsp;&nbsp;{" "}
                      <span className='fs-5 fw-bold lead'>{userData.userInfo.amount}$</span>{" "}
                      &nbsp;&nbsp; <BsArrowRightCircleFill size={24} style={{ marginTop: -5 }} />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Spinner
                        as='span'
                        animation='border'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />
                      <span> Loading... </span>
                    </React.Fragment>
                  )}
                </Button>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
