import { PROMO_CODE_SUCCESS, PROMO_CODE_ERROR } from "../constants/actionTypes";

const promoCodeReducer = (state = { result: null, errors: null }, action) => {
  switch (action.type) {
    case PROMO_CODE_SUCCESS:
      return { ...state, result: action?.payload, errors: null };

    case PROMO_CODE_ERROR:
      return { ...state, result: null, errors: action?.payload };

    default:
      return state;
  }
};

export default promoCodeReducer;
