import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {logout} from "../actions/businessActions";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import store from "../store";
import MenuIcon from '@material-ui/icons/Menu';


class NavigationDrawer extends Component {

  constructor() {
    super();
    this.state={
      list: {
          width: 250,
      },
      left: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
//     this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser = () => {
    this.props.logout();
    window.location.href = "/";
  }

  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ left: open });
  };


   render() {
    let { validToken, user } =this.props.security;
    const listNotAuthenticated = (
            <div
              className={clsx(this.list)}
              role="presentation"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
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

      const listAuthenticated = (
         <div
          className={clsx(this.list)}
          role="presentation"
          onClick={this.toggleDrawer(false)}
          onKeyDown={this.toggleDrawer(false)}
         >
          <nav>
            <List>
              <ListItem>
                <ListItemText primary="Menu" />
              </ListItem>
              <ListItem button>
                <Link to="/addbusiness" style={{textDecoration: 'none', color: 'black'}}>
                  <ListItemText primary="Add Business" />
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="/business/" style={{textDecoration: 'none', color: 'black'}}>
                  <ListItemText primary="Update Business" />
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="/my-business" style={{textDecoration: 'none', color: 'black'}}>
                  <ListItemText primary="My Business List" />
                </Link>
              </ListItem>
              <ListItem button>
                 <Link to="/logout" style={{textDecoration: 'none', color: 'black'}} onClick={this.logoutUser.bind(this)}>
                   <ListItemText primary="Logout" />
                 </Link>
               </ListItem>
            </List>
          </nav>
        </div>
       );
      let links;
      if(validToken && user) {
        links = listAuthenticated;
      } else {
        links = listNotAuthenticated;
      }

      return (
          <div>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <div xs='12'>
                  <Button onClick={this.toggleDrawer(true)}><MenuIcon/></Button>
                </div>
              </Grid>
              <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
                {links}
              </Drawer>
          </div>
      );
    }
}

NavigationDrawer.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security:state.security
})

export default withRouter(connect(
  mapStateToProps,
  { logout }
)(NavigationDrawer));
