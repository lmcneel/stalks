import React from "react";
import { Container, Row, Col, Button } from 'reactstrap';

import "./Content.css";


const Content = props => (
    <Container fluid id="content" className="mt-3">
        <Row className="my-3 mx-1">
            <Col className="bg-light border rounded">
            place components in something like this
            </Col>
            <Col className="bg-light border rounded ml-3">
            place components in something like this
            </Col>
        </Row>

        <Row className="my-3 mx-1">
            <Col className="bg-light border rounded">
            place components in something like this
            </Col>
        </Row>

    </Container>
);

export default Content;