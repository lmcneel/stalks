import React from 'react';
import {Container, Row, Col, Button} from 'reactstrap';


const Splash = (props) => <Container>
    <Row className="text-center mt-5">
        <Col>
        <img src="http://placekitten.com/700/300" className="mx-auto d-block"/>
        <h1 className="pt-5">Stock Market Pets</h1>
        <p>Sign up to adopt a Stock Market Pet and learn the basics of playing the stock market.</p>
        <Button>Sign up</Button>
        <Button>Log-in</Button>
        <p className="pt-5">ABOUT US | HELP | SETTINGS</p>
        </Col>
    </Row>
    </Container>

;

export default Splash;
