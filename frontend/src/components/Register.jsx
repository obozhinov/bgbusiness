import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import './style.scss';
import PropTypes from "prop-types";
import { register } from "../actions/userActions";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state= {
            username: '',
            password: '',
            passwordConfirmation: '',
            firstname: '',
            lastname: '',
//             errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
      this.setState({[event.target.name]: event.target.value} );
    }

    async handleSubmit(event) {
      event.preventDefault();
      let obj = {
        username: this.state.username,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation,
        firstname: this.state.firstname,
        lastname: this.state.lastname
      };
      if(obj.password !== obj.passwordConfirmation) {
//         this.setState({errors: "Passwords don't match!"});
        return;
      }
      this.props.register(obj, this.props.history);
    }
    render() {
//     const {errors} = this.state;
        return (
            <Grid item sm={12} md={9} lg={5} style={{margin: '10vh auto 0 auto'}}>
                <form onSubmit={this.handleSubmit} display="block" >
                    <h1>Register</h1>
                    <TextField style={{width: '100%', 'marginBottom': '3vh'}} id="email" name="username"
                                label="Email" variant="outlined" value={this.state.username} onChange={this.onChange}/>
                    <TextField style={{width: '100%', 'marginBottom': '3vh'}} type="password" id="password" name="password" label="Password" variant="outlined" value={this.state.password} onChange={this.onChange}/>
                    <TextField style={{width: '100%', 'marginBottom': '3vh'}} type="password" id="passwordConfirmation" name="passwordConfirmation" label="Password confirmation" variant="outlined" value={this.state.passwordConfirmation} onChange={this.onChange}/>
                    <TextField style={{width: '100%', 'marginBottom': '3vh'}} id="firstname" name="firstname" label="First name" variant="outlined" value={this.state.firstname} onChange={this.onChange}/>
                    <TextField style={{width: '100%', 'marginBottom': '3vh'}} id="lastname" name="lastname" label="Last name" variant="outlined" value={this.state.lastname} onChange={this.onChange}/>
                    <Button style={{width: '100%'}} variant="contained" color="primary" type="submit">Register</Button>
                </form>
            </Grid>
        );
    }
}

Register.propTypes = {
  register: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  errors: state.errors
});

export default withRouter(connect(
  mapStateToProps,
  { register }
)(Register));

