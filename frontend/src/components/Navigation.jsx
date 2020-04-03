import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import BusinessList from './BusinessList';
import NavigationDrawer from './NavigationDrawer';
import MyBusinessList from './MyBusinessList';
import AddBusiness from './AddBusiness';
import BusinessInfo from './BusinessInfo';
import UpdateBusiness from './UpdateBusiness';
import Register from './Register';
import { Provider } from 'react-redux';
import store from "../store";
import jwt_decode from "jwt-decode";
import setJWTToken from "../security/setJWTToken";
import {CURRENT_USER} from "../actions/types";
import SecureRoute from "../security/SecureRoute";


const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: CURRENT_USER,
    payload: decoded_jwtToken
  });

//   const currentTime = Date.now() / 1000;
//   if (decoded_jwtToken.exp < currentTime) {
//     store.dispatch(logout());
//     window.location.href = "/";
//   }
}

export default function Navigation() {

  return (
    <Provider store={ store }>
      <Router>
        <NavigationDrawer />
        <Switch>
         <Route path="/login">
           <Login />
         </Route>
{/*          <Route path="/logout"> */}
{/*                     <div>Loggin you out</div> */}
{/*          </Route> */}
         <Route path="/" exact>
          <BusinessList />
         </Route>
         <Route path="/register">
          <Register />
         </Route>
         <Route path="/business/info/:id">
           <BusinessInfo />
          </Route>
         <SecureRoute path="/addbusiness" component={AddBusiness}/>
         <SecureRoute path="/business/:id" component={UpdateBusiness}/>
         <SecureRoute path="/my-business" component={MyBusinessList}/>
        </Switch>
      </Router>
     </Provider>
  );
}