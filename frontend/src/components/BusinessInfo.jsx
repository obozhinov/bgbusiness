import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import _ from 'lodash';
import { getBusiness } from '../actions/businessActions';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

class BusinessInfo extends Component {
  constructor() {
    super();
    this.state= {
      id: "",
      name: "",
      imagePath: "",
      description: "",
      hiring: false,
      email: "",
      phone: "",
      website: "",
      street: "",
      unit: "",
      country: "",
      city: "",
      zip: "",
      baseOffice: false
    }
    this.defaultImage = this.defaultImage.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    if(props.business === undefined) {
      return null;
    }
    if (props.business.id !== state.id) {
      if(!_.isEmpty(props.business.address)) {
        return{
          id: props.business.id,
          name: props.business.name,
          imagePath: props.business.imagePath,
          description: props.business.description,
          hiring: props.business.hiring,
          email: props.business.email,
          phone: props.business.phone,
          website: props.business.website,
          street: props.business.address.street,
          unit: props.business.address.unit,
          country: props.business.address.country,
          city: props.business.address.city,
          zip: props.business.address.zip,
          baseOffice: props.business.address.baseOffice
        }
      }
      return {
        id: props.business.id,
        name: props.business.name,
        imagePath: props.business.imagePath,
        description: props.business.description,
        hiring: props.business.hiring,
        email: props.business.email,
        phone: props.business.phone,
        website: props.business.website,
        street: "",
        unit: "",
        country: "",
        city: "",
        zip: "",
        baseOffice: false
      }
    }
  }

  defaultImage(imagePath) {
    if(imagePath === null || imagePath === '') {
      return  process.env.PUBLIC_URL + "/business.jpg";
    }
  }

  componentDidMount() {
    this.props.getBusiness(this.props.match.params.id, this.props.history);
  }

  render() {
    let doHiring = this.state.hiring ? '' : 'not';
    let address;
    let phone;
    let email;
    if(this.state.street !== null && this.state.street !== ""){
      address = <p>You can find us at: {this.state.street} {this.state.unit} {this.state.city} {this.state.country} {this.state.zip}</p>
    }
    if(this.state.phone !== null && this.state.phone !== ""){
      phone =  <p>Phone: {this.state.phone}</p>;
    }
    if(this.state.email !== null && this.state.email !== ""){
      email = <p>Email: {this.state.email}</p>;
    }
    return (
      <Container>
        <Paper style={{background: "#f5f5f5", paddingTop: "5vh", paddingBottom: "5vh"}}>
          <a style={{textDecoration: "none", color: "black"}} href={this.state.website} target="_blank" rel="noopener noreferrer"><h1 style={{marginTop: "5vh"}}>{this.state.name}</h1></a>
          <img style={{height: "85vh", width: "60vw", maxWidht: "100vw"}} src={this.defaultImage(this.state.imagePath)} alt="business"/>
          <p>{this.state.description}</p>
          <p>We are {doHiring} hiring at the moment!</p>
          <a href={this.state.website} target="_blank" rel="noopener noreferrer">{this.state.website}</a>
          {email} {phone}
          {address}
        </Paper>
      </Container>
    );
  }
}

BusinessInfo.propTypes = {
  getBusiness: PropTypes.func.isRequired,
  business: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  business: state.business.business
});

export default withRouter(connect(
  mapStateToProps,
  { getBusiness }
)(BusinessInfo));
