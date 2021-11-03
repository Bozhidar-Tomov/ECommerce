import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AUTH_ERROR } from "../constants/actionTypes";

import { useDispatch } from "react-redux";

import decode from "jwt-decode";

const isAuthenticated = () => {
  const user = JSON.parse(
    localStorage.getItem("profile")
      ? localStorage.getItem("profile")
      : sessionStorage.getItem("profile")
  );

  if (user?.token) {
    const decodedToken = decode(user.token);
    console.log(decodedToken);
    if (decodedToken.exp * 1000 > new Date().getTime()) {
      if (!decodedToken.isAccountValidated)
        return "Your account is not verified! Verify your account in order to proceed.";
      return true;
    }
    return "Your session has expired. Sign in again.";
  }
  return "You have to sign in in order to proceed.";
};

function ProtectedRoute({ component: Component, ...props }) {
  isAuthenticated();
  const dispatch = useDispatch();
  return (
    <Route
      {...props}
      render={(props) => {
        const res = isAuthenticated();
        if (res === true) return <Component {...props} />;
        else {
          dispatch({ type: AUTH_ERROR, payload: res });
          return <Redirect to='/auth' />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
