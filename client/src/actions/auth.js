import { AUTH, AUTH_ERROR } from "../constants/actionTypes";
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
    dispatch({ type: AUTH, payload: data });
    history.push("/store");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
  }
};
