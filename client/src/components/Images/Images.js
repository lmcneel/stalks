import React from 'react';
// import './Images.css';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';
// import LinkButton from '/components/LinkButton'


const Images =  React.createClass({
  proptypes: {
    name: PropTypes.string,
    title: PropTypes.string,
    img: PropTypes.string,
    portfolio: PropTypes.string,
  },
  
render() {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 pb-4 ">
      <div className="bg-light border rounded">
        <div className="img-container">
          <Card >
            <CardImg onClick={(event) => {
              console.log('Working');
            }} src={this.props.img} alt={this.props.name} />
            <CardBody>
              <CardTitle>{this.props.name}</CardTitle>
              <CardSubtitle>{this.props.title}</CardSubtitle>
              <Button>
                <a href={this.props.portfolio} target="_blank">Portfolio Link</a>
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
        );
        },
    });
;
      export default Images;

