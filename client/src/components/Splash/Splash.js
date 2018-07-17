import React from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';


const Splash = (props) => <Container>
    <Row className="text-center mt-5">
        <Col>
        <img src="http://placekitten.com/700/300" className="mx-auto d-block"/>
        <h1 className="pt-5">Stock Market Pets</h1>
        <p>Adopt a Stock Market Pet and learn the basics of the stock market.</p>
        </Col>
    </Row>
    <Row>
        <Col className="bg-light">
            <Form className="">
                <FormGroup>
                <Label for="username">Username</Label>
                <Input type="username" name="username" id="userName" />
                </FormGroup>
                <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="userPassword" />
                </FormGroup>
                <Button>Log-in</Button>
            </Form>
            </Col>
    </Row>

    <Row>
        <Col>
        <p>Get a Stock Market Pet Today</p>
        <Button>Sign up</Button>
        </Col>
    </Row>
    </Container>

;

export default Splash;
