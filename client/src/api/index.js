import axios from "axios";

const API = axios.create({
  baseURL: `https://tech-checkie-noit.herokuapp.com`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authentication = `Bearer: ${JSON.parse(localStorage.getItem("profile")).token}`;
  } else if (sessionStorage.getItem("profile")) {
    req.headers.authentication = `Bearer: ${JSON.parse(sessionStorage.getItem("profile")).token}`;
  }
  return req;
});

export const fetchProductData = (productId = "") => API.get(`products/${productId}`);

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);

export const verifyEmail = (token) => API.get(`/users/validate/${token}`);
export const sendVerificationEmail = (userInfo) =>
  API.post("/users/sendVerificationEmail", userInfo);

export const fetchUserData = () => API.get("/users/fetchUserData");
export const removeItemFromUserData = (item) => API.post("/users/removeItemFromUserData", item);
export const handleLikedList = (item) => API.post("/users/addProductToLikedList", item);
export const addProductToCart = (item) => API.post("/users/addProductToCart", item);
export const deleteUser = (user) => API.delete("/users/deleteUser", user);

export const checkout = (data) => API.post("/payments/create-checkout-session", data);
