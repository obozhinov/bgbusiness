import { GET_BUSINESSES, GET_BUSINESS } from "../actions/types";

const initialState = {
  businesses: [],
  business: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BUSINESSES:
          return {
            ...state,
            businesses: action.payload
          };
    case GET_BUSINESS:
          return {
            ...state,
            business: action.payload
          };

    default:
      return state;
  }
}