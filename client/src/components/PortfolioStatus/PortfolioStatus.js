import React from 'react';
import {Row, Col} from 'reactstrap';
import PetfolioValue from '../PetfolioValue/PetfolioValue';
import BankValue from '../BankValue/BankValue';

const PortfolioStatus = (props) => (
    <div id="portfolio-stats" className="bg-light pt-3 px-4">
        <Row>
            <Col sm="12" md="4" className="d-flex justify-content-sm-center justify-content-md-start">
                <h1>Page Title</h1>
            </Col>
            <Col sm="12" md="8">
                <ul className="d-flex justify-content-sm-center justify-content-md-end">
                    <li>
                    <PetfolioValue />
                    </li>
                    <li className="bank">
                    <BankValue />
                </li>

                </ul>
            </Col>
        </Row>

    </div>
);


export default PortfolioStatus;
