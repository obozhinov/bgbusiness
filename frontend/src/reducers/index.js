import { combineReducers } from "redux";
import businessReducer from "./businessReducer";
import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  errors: errorReducer,
  business: businessReducer,
  security: securityReducer
});