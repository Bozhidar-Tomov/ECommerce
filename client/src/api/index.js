import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer: ${JSON.parse(localStorage.getItem("profile")).token}`;
  } else if (sessionStorage.getItem("profile")) {
    req.headers.authorization = `Bearer: ${JSON.parse(sessionStorage.getItem("profile")).token}`;
  }
  return req;
});

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
export const deleteUser = (formData) => API.delete("/users/delete_user", formData);

export const addPromoCode = (formData) => API.post("/promo-codes/add", formData);
export const validatePromoCode = (formData) => API.post("/promo-codes/validate", formData);
export const deletePromoCode = (formData) => API.delete("/promo-codes/deletePromoCode", formData);
