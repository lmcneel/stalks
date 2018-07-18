import React from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import mainLogo from './../../assets/images/smp-logo.svg';


const Splash = (props) => <Container className="bg-success">
    <Row className="text-center mt-5">
        <Col>
        <img src="http://placekitten.com/700/300" className="mx-auto d-block"/>
        <img src={mainLogo} alt="Text Logo for Stock Market
         Pets in a pixel looking fontface, logo is white on green bg" className="mx-auto d-block col-8 mt-5 mb-3"/>
        <p className="text-light description">Adopt a Stock Market Pet and learn the basics of the stock market.</p>
        </Col>
    </Row>
    <Row>
        <Col>
            <Form className=" bg-light col-5 px-4 py-3 mx-auto border rounded">
                <FormGroup>
                <Label for="username">Username</Label>
                <Input type="username" name="username" id="userName" />
                </FormGroup>
                <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="userPassword" />
                </FormGroup>
                <Button className="col-12">Log-in</Button>
            </Form>
            </Col>
    </Row>

    <Row className="py-3">
        <Col>
        <div className="bg-light col-5 px-3 py-3 mx-auto border rounded text-center">
        <p className="mb-0">Get a Stock Market Pet Today <Button className="ml-3">Sign up</Button></p>
        </div>
        </Col>
    </Row>
    </Container>

;

export default Splash;
