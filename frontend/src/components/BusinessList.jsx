import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import BusinessItem from './BusinessItem';
import { connect } from "react-redux";
import { getBusinesses } from "../actions/businessActions";
import { withRouter } from 'react-router-dom';

class BusinessList extends Component {
    componentDidMount() {
      this.props.getBusinesses();
    };

    render() {
      const { businesses } = this.props.business;
      if(businesses === []) return(<div>No businesses added yet!</div>);
      return (
          <Grid container spacing={3} >
             {businesses.map(business => {
                return(<BusinessItem key={business.id} showUpdate={false} showDelete={false} id={business.id} name={business.name} description={business.description} image={business.imagePath} />);
             })}
          </Grid>
      );
    }
}

BusinessList.propTypes = {
  business: PropTypes.object.isRequired,
  getBusinesses: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  business: state.business,
});

export default withRouter(connect(
  mapStateToProps,
  { getBusinesses }
)(BusinessList));
