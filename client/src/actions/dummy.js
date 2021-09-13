import * as api from "../api";

export const get = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDummy();
    dispatch({ type: "FETCH", payload: data });
  } catch (error) {
    console.log(error);
  }
};
