import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './style.scss';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/userActions";
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state= {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
      if(this.props.security.validToken) {
        this.props.history.push('/');
      }
    }

    componentDidUpdate() {
      if(this.props.security.validToken) {
        this.props.history.push('/');
      }
    }

    onChange(event) {
      this.setState({[event.target.name]: event.target.value} );
    }

    handleSubmit(event) {
      event.preventDefault();
      let userDetails = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.login(userDetails);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} display="block" style={{width: '30vw', margin: '25vh auto 0 auto'}}>
                    <h1>Login</h1>
                    <TextField style={{width: '100%', 'marginBottom': '3vh'}} id="email" name="username" label="Email" variant="outlined" value={this.state.username} onChange={this.onChange}/>
                    <TextField style={{width: '100%', 'marginBottom': '3vh'}} type="password" id="password" name="password" label="Password" variant="outlined" value={this.state.password} onChange={this.onChange}/>
                    <Button style={{width: '100%'}} variant="contained" color="primary" type="submit">Login</Button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default withRouter(connect(
  mapStateToProps,
  { login }
)(Login));
