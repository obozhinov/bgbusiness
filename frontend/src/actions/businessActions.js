import axios from 'axios';
import {GET_BUSINESSES, GET_ERRORS, GET_BUSINESS, DELETE_BUSINESS, CURRENT_USER} from './types.js';
import setJWTToken from "../security/setJWTToken";

//actions
export const createBusiness = (business, history) => async dispatch => {
  try {
    await axios.post('http://localhost:8080/business', business);
    history.push("/");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const deleteBusiness = (id) => async dispatch => {
  try {
    if (
      window.confirm(
        "Are you sure? This will delete the project and all the data related to it"
      )
    ) {
      await axios.delete(`http://localhost:8080/business/${id}`);
      dispatch({
        type: DELETE_BUSINESS,
        payload: id
      })
      }
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
}

export const getBusinesses = () => async dispatch => {
  const response = await axios.get('http://localhost:8080/business/all');
  dispatch({
    type: GET_BUSINESSES,
    payload: response.data
  });
}

export const getMyBusinesses = () => async dispatch => {
  const response = await axios.get('http://localhost:8080/business/all-for-user');
  dispatch({
    type: GET_BUSINESSES,
    payload: response.data
  });
}

export const getBusiness = (id, history) => async dispatch => {
  const response = await axios.get(`http://localhost:8080/business/${id}`);
  dispatch({
    type: GET_BUSINESS,
    payload: response.data
  });
}

export const login = (user, history) => async dispatch => {
  try{
      const response = await axios.post("http://localhost:8080/login", user);
      dispatch({
        type: CURRENT_USER,
        payload: response.data
      });
    } catch(err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.payload
      });
    }
}

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: CURRENT_USER,
    payload: {}
  })
}
