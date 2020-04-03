import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import { deleteBusiness } from "../actions/businessActions";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

class BusinessItem extends React.Component {
  constructor(props) {
    super(props);
    this.style = makeStyles({
                       media: {
                         height: 200,
                         width: 400,
                         maxWidth: 400
                       },
                     });

    this.defaultImage = this.defaultImage.bind(this);
    this.deleteBusiness = this.deleteBusiness.bind(this);
    this.updateBusiness = this.updateBusiness.bind(this);
    this.toInfo = this.toInfo.bind(this);
  }

  defaultImage(imagePath) {
    if(imagePath === null || imagePath === '') {
      return  process.env.PUBLIC_URL + "/business.jpg";
    }
  }

  deleteBusiness() {
    this.props.deleteBusiness(this.props.id);
  }

  updateBusiness() {
    this.props.history.push(`/business/${this.props.id}`);
  }

  toInfo() {
    this.props.history.push(`/business/info/${this.props.id}`);
  }



  render() {
    let deleteButton;
    let updateButton;
    if(this.props.showDelete) {
      deleteButton = <Button size="small" color="primary" onClick={this.deleteBusiness}>
                       Delete
                     </Button>;
    }
    if(this.props.showUpdate) {
      updateButton = <Button size="small" color="primary" onClick={this.updateBusiness}>
                                   Update
                                 </Button>;
    }
      return (
      <Grid item xs={12} md={4} lg={4}>
        <Card className={this.style.media}>
          <CardActionArea>
            <CardMedia
              component="img"
              className={this.style.media}
              image={this.defaultImage(this.props.image)}
              title="Business image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.name.toString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.description === null ? null : this.props.description.toString()}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {deleteButton}
            {updateButton}
            <Button size="small" color="primary" onClick={this.toInfo}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

BusinessItem.propTypes = {
  deleteBusiness: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
});

export default withRouter(connect(
  mapStateToProps,
  { deleteBusiness }
)(BusinessItem));