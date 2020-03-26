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


export default class BusinessItem extends React.Component {
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
  }

  defaultImage(imagePath) {
    if(imagePath === null) {
      return  process.env.PUBLIC_URL + "/business.jpg";
    }
  }

  render() {
    return (
      <Grid item xs={4}>
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
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}