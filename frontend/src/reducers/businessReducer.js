import { GET_BUSINESSES, GET_BUSINESS, DELETE_BUSINESS } from "../actions/types";

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
    case DELETE_BUSINESS:
          return {
            ...state,
            businesses: state.businesses.filter(
                      business => business.id !== action.payload
                    )
          };

    default:
      return state;
  }
}