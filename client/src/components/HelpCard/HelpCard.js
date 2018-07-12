import React from 'react';
import {Card, Button, CardTitle, CardText, Row, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
  };

const HelpCard = (props) => {
    return (
        <Container>
            <Row>
                <Card body>
                    <CardTitle>{props.title}</CardTitle>
                    <CardText>{props.text}</CardText>
                    <div className="text-right">
                        <Link to={props.buttonLink}><Button>{props.buttonText}</Button></Link>
                    </div>
                </Card>
            </Row>
        </Container>

    );
};

HelpCard.propTypes = propTypes;
export default HelpCard;
