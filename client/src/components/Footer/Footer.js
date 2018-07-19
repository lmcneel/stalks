import React from 'react';
import {Container, Row} from 'reactstrap';

const Footer = (props) =>
    <Container fluid>
        <Row className="bgfooter p-3">
            <footer>
                <p className="mb-0">Data provided for free by IEX. View IEX’s Terms of Use. </p>
            </footer>
        </Row>
    </Container>
;

export default Footer;
