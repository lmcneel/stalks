import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, CardImg, CardImgOverlay, CardBody } from 'reactstrap';

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
                    <Button className="d-block d-sm-none">{props.buttonText}</Button>
                </Card>
            </Row>
        </Container>
 
    );
};

export default HelpCard;