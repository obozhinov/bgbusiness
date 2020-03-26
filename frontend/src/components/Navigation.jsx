import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import BusinessList from './BusinessList';
import Register from './Register';
import { Provider } from 'react-redux';
import store from "../store";

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

export default function Navigation() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ left: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <nav>
        <List>
          <ListItem>
            <ListItemText primary="Menu" />
          </ListItem>
          <ListItem button>
            <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>
              <ListItemText primary="Login" />
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/register" style={{textDecoration: 'none', color: 'black'}}>
              <ListItemText primary="Register" />
            </Link>
          </ListItem>
        </List>
      </nav>
    </div>
  );

  return (
    <Provider store={ store }>
      <Router>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <div xs='12'>
          <Button onClick={toggleDrawer(true)}><MenuIcon/></Button>
        </div>
      </Grid>
        <Drawer open={state['left']} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        <Switch>
         <Route path="/login">
           <Login />
         </Route>
         <Route path="/" exact>
          <BusinessList />
         </Route>
         <Route path="/register">
          <Register />
         </Route>
        </Switch>
      </Router>
     </Provider>
  );
}