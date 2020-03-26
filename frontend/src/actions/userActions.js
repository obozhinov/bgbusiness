import axios from 'axios';
import setJWTToken from "../security/setJWTToken";
import jwt_decode from "jwt-decode";
import {GET_ERRORS, CURRENT_USER} from './types.js';

export const register = (userDetails, history) => async dispatch => {
  try{
    debugger;
    await axios.post("http://localhost:8080/register", userDetails);
    debugger;
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    })
  } catch(err) {
  debugger;
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
}

export const login = (userDetails, history) => async dispatch => {
  try{
    const response = await axios.post("http://localhost:8080/login", userDetails);
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);
    setJWTToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: CURRENT_USER,
      payload: decoded
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: CURRENT_USER,
    payload: {}
  });
};