import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { createBusiness } from '../actions/businessActions';
import { getBusiness } from '../actions/businessActions';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import _ from 'lodash';

class UpdateBusiness extends Component {
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
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  componentDidMount() {
    this.props.getBusiness(this.props.match.params.id, this.props.history);
  }

  onChange(event) {
   this.setState({[event.target.name]: event.target.value} );
  }

  handleSubmit(event) {
    event.preventDefault();
    debugger;
    let obj = {
      id: this.state.id,
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
          <h1>Update Business</h1>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}} InputLabelProps={{ shrink: true }} id="name" name="name" label="Name" variant="outlined" value={this.state.name} onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}} InputLabelProps={{ shrink: true }} id="imagePath" name="imagePath" label="Link to Image" variant="outlined" value={this.state.imagePath} onChange={this.onChange}/>
          <TextField style={{width: '100%', 'marginBottom': '3vh'}} InputLabelProps={{ shrink: true }} multiline rows="4" id="description" name="description" label="Description" variant="outlined" value={this.state.description} onChange={this.onChange}/>
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
                     InputLabelProps={{ shrink: true }}
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
UpdateBusiness.propTypes = {
  createBusiness: PropTypes.func.isRequired,
  getBusiness: PropTypes.func.isRequired,
  business: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  errors: state.errors,
  business: state.business.business
});

export default withRouter(connect(
  mapStateToProps,
  { createBusiness, getBusiness }
)(UpdateBusiness));

