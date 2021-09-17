import { PROMO_CODE_ERROR, PROMO_CODE_SUCCESS } from "../constants/actionTypes";
import * as api from "../api";

export const addCode = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addPromoCode(formData);
    dispatch({ type: PROMO_CODE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROMO_CODE_ERROR,
      payload: error?.response?.data.message || "Internal Server Error. Please try again later",
    });
  }
};

export const validateCode = (formData) => async (dispatch) => {
  try {
    const { data } = await api.validatePromoCode(formData);
    dispatch({ type: PROMO_CODE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROMO_CODE_ERROR,
      payload: error?.response?.data.message || "Internal Server Error. Please try again later",
    });
  }
};

export const deleteCode = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deletePromoCode(formData);
    dispatch({ type: PROMO_CODE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROMO_CODE_ERROR,
      payload: error?.response?.data.message || "Internal Server Error. Please try again later",
    });
  }
};
