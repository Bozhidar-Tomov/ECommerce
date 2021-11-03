import { AUTH, AUTH_ERROR, USER_INFORMATION } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, payload: data });
    history.push("/store");
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error?.response?.data.message || "Internal Server Error. Please try again later",
    });
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: USER_INFORMATION, payload: data });
    history.push(`./auth/verify`);
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response?.data.message || "Internal Server Error. Please try again later",
    });
  }
};

export const sendVerificationEmail = (userInfo) => async (dispatch) => {
  try {
    api.sendVerificationEmail(userInfo);
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response?.data.message || "Internal Server Error. Please try again later",
    });
  }
};
