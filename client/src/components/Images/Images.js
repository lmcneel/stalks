import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';

const propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    img: PropTypes.string,
    portfolio: PropTypes.string,
};
// You should convert the column div tag over to ReactStrap Col component
// the onClick with the arrow function inside might need to be a handler passed in on the props

const images = (props) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 pb-4 ">
            <div className="bg-light border rounded">
                <div className="img-container">
                    <Card >
                        <CardImg onClick={(event) => {
                            console.log('Working');
                            }}
                            src={props.img}
                            alt={props.name} />
                        <CardBody>
                            <CardTitle>{props.name}</CardTitle>
                            <CardSubtitle>{props.title}</CardSubtitle>
                            <Button>
                                <a href={props.portfolio} target="_blank">Portfolio Link</a>
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

images.propTypes = propTypes;

export default images;
