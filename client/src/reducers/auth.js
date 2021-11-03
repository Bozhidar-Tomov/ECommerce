import { AUTH, LOGOUT, AUTH_ERROR, CLEAR_ERROR, USER_INFORMATION } from "../constants/actionTypes";

const authReducer = (state = { authData: null, errors: null, userInfo: null }, action) => {
  switch (action.type) {
    case AUTH:
      if (action.payload.rememberMe) {
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      } else {
        sessionStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      }
      return { ...state, authData: action?.payload, errors: null };

    case USER_INFORMATION:
      return { ...state, userInfo: action?.payload };

    case LOGOUT:
      localStorage.removeItem("profile");
      sessionStorage.removeItem("profile");
      return { ...state, authData: null, errors: null };

    case AUTH_ERROR:
      return { ...state, errors: action?.payload };

    case CLEAR_ERROR:
      return { ...state, errors: null };

    default:
      return { ...state };
  }
};

export default authReducer;
