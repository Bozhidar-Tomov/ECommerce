import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import { useLocation } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Avatar from "react-avatar";

import { Link } from "react-router-dom";

import decode from "jwt-decode";

function NavBar(props) {
  const theme = sessionStorage.getItem("theme");
  const [user, setUser] = useState(
    JSON.parse(
      localStorage.getItem("profile")
        ? localStorage.getItem("profile")
        : sessionStorage.getItem("profile")
    )
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const decodedToken = user?.token ? decode(user.token) : null;

  const signOut = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });

    setUser(null);
  }, [dispatch]);

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.exp * 1000 < new Date().getTime()) signOut();
    }
    setUser(
      JSON.parse(
        localStorage.getItem("profile")
          ? localStorage.getItem("profile")
          : sessionStorage.getItem("profile")
      )
    );
    // eslint-disable-next-line
  }, [user?.token, location, signOut]);

  return (
    <Navbar bg={theme} variant={theme} expand='md' className='pt-3 mx-5'>
      <Navbar.Brand href='/' className='fw-bold fst-normal text-primary'>
        Online Partner Retailer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='navbarScroll' />
      <Navbar.Collapse id='navbarScroll'>
        <Nav className='me-auto my-2 my-lg-0' navbarScroll>
          <Nav.Link as={Link} to='/store'>
            Store
          </Nav.Link>
          {decodedToken && (
            <Nav.Link as={Link} to='/dashboard'>
              Dashboard
            </Nav.Link>
          )}
        </Nav>
        {location.pathname !== "/auth" &&
          (decodedToken ? (
            <Nav>
              <Container>
                <Avatar
                  name={decodedToken.name}
                  round={true}
                  src={decodedToken.imageUrl}
                  size='36'
                />
                <span className='fs-6'> {decodedToken.name}</span>
                {!decodedToken.isAccountValidated && (
                  <Badge pill className='ms-3 text-dark' bg='warning'>
                    Not verified
                  </Badge>
                )}
                <Button as={Link} to='/' variant='outline-secondary ms-4' onClick={signOut}>
                  Sign Out
                </Button>
              </Container>
            </Nav>
          ) : (
            <Nav>
              <Button as={Link} to='/auth' variant='outline-secondary'>
                Sign In
              </Button>
            </Nav>
          ))}
      </Navbar.Collapse>
      <form className='ms-4 form'>
        <input
          onClick={props.themeToggler}
          id='dark-mode'
          className='toggle'
          type='checkbox'
          role='switch'
        />
        <div className='curtain'></div>
      </form>
    </Navbar>
  );
}

export default NavBar;
