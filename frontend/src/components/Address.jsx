import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class Address extends Component {

  onChange(event) {
   this.props.onChange(this.props.address);
  }
  render() {
    return (
      <div>
        <h3>Address</h3>
        <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                   id="street"
                   name="street"
                   label="Street"
                   variant="outlined"
                   value={this.props.address.street}
                   onChange={this.onChange}/>
        <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                   id="unit"
                   name="unit"
                   label="Unit"
                   variant="outlined"
                   value={this.props.unit}
                   onChange={this.onChange}/>
        <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                   id="country"
                   name="country"
                   label="Country"
                   variant="outlined"
                   value={this.props.country}
                   onChange={this.onChange}/>
        <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                   id="city"
                   name="city"
                   label="City"
                   variant="outlined"
                   value={this.props.city}
                   onChange={this.onChange}/>
        <TextField style={{width: '100%', 'marginBottom': '3vh'}}
                   id="zip"
                   name="zip"
                   label="Zip"
                   variant="outlined"
                   value={this.props.zip}
                   onChange={this.onChange}/>
        <FormControlLabel style={{width: '100%', 'marginBottom': '3vh'}}
                          control={
                            <Checkbox
                              checked={this.props.baseOffice}
                              onChange={(e) => {this.setState({baseOffice: e.target.checked})} }
                              name="baseOffice"
                              color="primary"
                            />
                          }
                          label="Base Office"
          />

      </div>
    );
  }
}

Address.propTypes = {
  address: PropTypes.object.isRequired,
  onAddressAdded: PropTypes.func.isRequired
};

export default Address;
