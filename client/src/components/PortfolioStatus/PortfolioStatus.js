import React from 'react';
import {Row, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBriefcase, faPiggyBank} from '@fortawesome/fontawesome-free-solid';

const PortfolioStatus = (props) => (
    <div id="portfolio-stats" className="bg-light pt-3 px-4">
        <Row>
            <Col xs="12" md="4" className="d-flex justify-content-sm-center justify-content-md-start">
                <h2>Page Title</h2>
            </Col>
            <Col xs="12" md="8">
                <ul className="d-flex justify-content-sm-center justify-content-md-end">
                    <li className="portfolioValue">
                        <FontAwesomeIcon icon={faBriefcase} />
                        $100,000,000
                </li>
                    <li className="ml-5 bankValue">
                        <FontAwesomeIcon icon={faPiggyBank} />
                        $100,000,000
                </li>

                </ul>
            </Col>
        </Row>

    </div>
);


export default PortfolioStatus;
