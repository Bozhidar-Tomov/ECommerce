import { AUTH, LOGOUT, AUTH_ERROR } from "../constants/actionTypes";

const authReducer = (state = { authData: null, errors: null }, action) => {
  switch (action.type) {
    case AUTH:
      if (action.payload.rememberMe) {
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      } else {
        sessionStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      }
      return { ...state, authData: action?.payload, errors: null };

    case LOGOUT:
      localStorage.removeItem("profile");
      sessionStorage.removeItem("profile");
      return { ...state, authData: null, errors: null };

    case AUTH_ERROR:
      return { ...state, errors: action?.payload };

    default:
      return state;
  }
};

export default authReducer;
