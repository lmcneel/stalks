import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Container} from 'reactstrap';
import PropTypes from 'prop-types';

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
                    <div className="text-right d-none d-sm-block">
                        <Button href="{props.buttonLink}">{props.buttonText}</Button>
                    </div>
                    <Button href="{props.buttonLink}" className="d-block d-sm-none">{props.buttonText}</Button>
                </Card>
            </Row>
        </Container>

    );
};

HelpCard.propTypes = propTypes;
export default HelpCard;
