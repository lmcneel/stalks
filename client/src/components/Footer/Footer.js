import React from 'react';
import {Container, Row} from 'reactstrap';

const Footer = (props) =>
    <Container>
        <Row>
            <footer className="site-footer">
                <div className="footer">
                <p>Data provided for free by IEX. View IEX’s Terms of Use. </p>
                </div>
            </footer>
        </Row>
    </Container>
;

export default Footer;
