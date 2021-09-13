import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import { useHistory, useLocation } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Avatar from "react-avatar";

import decode from "jwt-decode";

import "./styles.css";

function NavBar() {
  const [user, setUser] = useState(
    JSON.parse(
      localStorage.getItem("profile")
        ? localStorage.getItem("profile")
        : sessionStorage.getItem("profile")
    )
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const signOut = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");
    setUser(null);
  }, [dispatch, history]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) signOut();
    }
    setUser(
      JSON.parse(
        localStorage.getItem("profile")
          ? localStorage.getItem("profile")
          : sessionStorage.getItem("profile")
      )
    );
  }, [user?.token, location, signOut]);

  return (
    <Navbar expand='md' className='pt-3 mx-5'>
      <Container>
        <Navbar.Brand href='/' className='fw-bold fst-normal text-primary'>
          Online Partner Retailer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0' navbarScroll>
            <Nav.Link href='/store'>Store</Nav.Link>
          </Nav>

          {user?.result ? (
            <Nav>
              <Container>
                <Avatar
                  name={user?.result.name}
                  round={true}
                  src={user?.result.imageUrl}
                  size='36'
                />
                <span> {user?.result.name} </span>
                <Button as='a' href='/' variant='outline-secondary ms-4' onClick={signOut}>
                  Sign Out
                </Button>
              </Container>
            </Nav>
          ) : (
            <Nav>
              <Button as='a' href='/auth' variant='outline-secondary'>
                Sign In
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
