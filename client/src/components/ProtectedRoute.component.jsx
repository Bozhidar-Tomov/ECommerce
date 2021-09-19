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
    if (decodedToken.exp * 1000 < new Date().getTime()) return false;
    return true;
  }
};

function ProtectedRoute({ component: Component, ...props }) {
  const dispatch = useDispatch();
  return (
    <Route
      {...props}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          (dispatch({ type: AUTH_ERROR, payload: "You have to sign in in order to proceed." }),
          (<Redirect to='/auth' />))
        )
      }
    />
  );
}

export default ProtectedRoute;
