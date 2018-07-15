import React from 'react';
import {Row, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBriefcase, faPiggyBank} from '@fortawesome/fontawesome-free-solid';
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
                    <li className="portfolioValue">
                        <FontAwesomeIcon icon={faBriefcase} />
                        <span className="pad"><PetfolioValue /></span>
                </li>
                    <li className="ml-5 bankValue bank">
                        <FontAwesomeIcon icon={faPiggyBank} />
                        <span className="pad"><BankValue /></span>
                </li>

                </ul>
            </Col>
        </Row>

    </div>
);


export default PortfolioStatus;
