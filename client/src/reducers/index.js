import { combineReducers } from "redux";
import auth from "./auth";
import promoCode from "./promoCode";

export default combineReducers({ auth, promoCode });
