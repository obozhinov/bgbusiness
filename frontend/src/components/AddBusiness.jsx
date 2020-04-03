import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { createBusiness } from '../actions/businessActions';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

class AddBusiness extends Component {
  constructor() {
    super();
    this.state= {
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
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(event) {
   this.setState({[event.target.name]: event.target.value} );
  }

  onAddressAdded(address) {
    this.setState({address: address})
  };

  handleSubmit(event) {
    event.preventDefault();
    debugger;
    let obj = {
      name: this.state.name,
      imagePath: this.state.imagePath,
      description: this.state.description,
      hiring: this.state.hiring,
      email: this.state.email,
      phone: this.state.phone,
      website: this.state.website,
      street: this.state.street,
      unit: this.state.unit,
      country: this.state.country,
      city: this.state.city,
      zip: this.state.zip,
      baseOffice: this.state.baseOffice
    };
    this.props.createBusiness(obj, this.props.history);
  }

  render() {
    return (
      <Grid item sm={12} md={9} lg={5} style={{margin: '10vh auto 0 auto'}}>
        <form display="block" onSubmit={this.handleSubmit} >
          <h1>Add Business</h1>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}} id="name" name="name" label="Name" variant="outlined" value={this.state.name} onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}} id="imagePath" name="imagePath" label="Link to Image" variant="outlined" value={this.state.imagePath} onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}} multiline rows="4" id="description" name="description" label="Description" variant="outlined" value={this.state.description} onChange={this.onChange}/>
          <FormControlLabel
                  style={{width: '100%', 'marginBottom': '3vh'}}
                  control={
                    <Checkbox
                      checked={this.state.hiring}
                      onChange={(e) => {this.setState({hiring: e.target.checked})} }
                      name="hiring"
                      color="primary"
                    />
                  }
                  label="Hiring"
                />
          <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                     id="email"
                     name="email"
                     label="Email"
                     variant="outlined"
                     value={this.state.email}
                     onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                     id="phone"
                     name="phone"
                     label="Phone"
                     variant="outlined"
                     value={this.state.phone}
                     onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                     id="website"
                     name="website"
                     label="Website"
                     variant="outlined"
                     value={this.state.website}
                     onChange={this.onChange}/>
          <h3>Address</h3>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                     id="street"
                     name="street"
                     label="Street"
                     variant="outlined"
                     value={this.state.street}
                     onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                     id="unit"
                     name="unit"
                     label="Unit"
                     variant="outlined"
                     value={this.state.unit}
                     onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                     id="country"
                     name="country"
                     label="Country"
                     variant="outlined"
                     value={this.state.country}
                     onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                     id="city"
                     name="city"
                     label="City"
                     variant="outlined"
                     value={this.state.city}
                     onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                     id="zip"
                     name="zip"
                     label="Zip"
                     variant="outlined"
                     value={this.state.zip}
                     onChange={this.onChange}/>
          <FormControlLabel style={{width: '100%', 'marginBottom': '3vh'}}
                            control={
                              <Checkbox
                                checked={this.state.baseOffice}
                                onChange={(e) => {this.setState({baseOffice: e.target.checked})} }
                                name="baseOffice"
                                color="primary"
                              />
                            }
                            label="Base Office"
            />
          <Button style={{width: '100%'}} variant="contained" color="primary" type="submit">Add Business</Button>
        </form>
      </Grid>
    );
  }
}
AddBusiness.propTypes = {
  createBusiness: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  errors: state.errors
});

export default withRouter(connect(
  mapStateToProps,
  { createBusiness }
)(AddBusiness));

