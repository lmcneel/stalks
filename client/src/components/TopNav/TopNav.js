import React from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import mainLogo from './../../assets/images/smp-logo.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faQuestionCircle, faCog, faInfo, faSignOutAlt} from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';

const propTypes = {
    navToggleHandler: PropTypes.func,
};


const TopNav = (props) => {
    return (
    <Container fluid>
        <Row className="top-nav px-3 pt-4 pb-3">
            <Col xs="12" md="8" className="d-flex justify-content-sm-center justify-content-md-start">
                <a href="">
                <img src={mainLogo} className="main-logo"
                alt="Text Logo for Stock Market Pets in a pixel looking fontface, logo is white on green bg"/>
                </a>
            <Button id="sidebarCollapse" className="btn btn-info ml-4" onClick={props.navToggleHandler}>
            <FontAwesomeIcon icon={faBars} />
            </Button>
            </Col>
            <Col xs="12" md="4">
                <ul id="topNavIcons" className="nav justify-content-sm-center justify-content-md-end">
                    <li className="nav-item">
                        <a className="nav-link" href="">
                        <FontAwesomeIcon className="iconsize" icon={faQuestionCircle} />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">
                        <FontAwesomeIcon className="iconsize" icon={faCog} />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">
                        <FontAwesomeIcon className="iconsize" icon={faInfo} />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">
                        <FontAwesomeIcon className="iconsize" icon={faSignOutAlt} />
                        </a>
                    </li>
                </ul>
            </Col>
        </Row>
    </Container>
);
};

TopNav.propTypes = propTypes;

export default TopNav;

