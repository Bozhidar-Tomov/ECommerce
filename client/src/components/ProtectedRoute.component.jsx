import React from "react";
import { Navigate } from "react-router-dom";
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
    if (decodedToken.exp * 1000 > new Date().getTime()) {
      if (!decodedToken.isAccountValidated && window.location.pathname !== "/app/dashboard")
        return ["Your account is not verified! Verify your account in order to proceed.", "/app"];
      return true;
    }
    return ["Your session has expired. Sign in again.", "/app/auth"];
  }
  return ["You have to sign in in order to proceed.", "/app/auth"];
};

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const auth = isAuthenticated();

  if (auth === true) {
    return children;
  } else {
    dispatch({ type: AUTH_ERROR, payload: auth[0] });
    return <Navigate to={auth[1]} />;
  }
}

export default ProtectedRoute;
