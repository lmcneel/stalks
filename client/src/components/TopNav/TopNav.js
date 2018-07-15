import React from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import mainLogo from './../../assets/images/smp-logo.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faQuestionCircle, faCog, faInfo, faSignOutAlt} from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const propTypes = {
    navToggleHandler: PropTypes.func,
};


const TopNav = (props) => {
    return (
        <Container fluid>
            <Row className="top-nav pt-2 pb-2">
                <Col xs="12" md="8" className="d-flex justify-content-sm-center justify-content-md-start">
                    <Link to={'/petfolio'}>
                        <img src={mainLogo} className="main-logo"
                        alt="Text Logo for Stock Market Pets in a pixel looking fontface, logo is white on green bg" />
                    </Link>
                    <Button id="sidebarCollapse" className="btn btn-info ml-4" onClick={props.navToggleHandler}>
                        <FontAwesomeIcon icon={faBars} className="iconsize" />
                    </Button>
                </Col>
                <Col xs="12" md="4" className="pr-0">
                    <ul id="topNavIcons" className="nav justify-content-sm-center justify-content-md-end">
                        <li className="nav-item">
                            <Link to={'/help'}><FontAwesomeIcon className="iconsize" icon={faQuestionCircle} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/settings'}><FontAwesomeIcon className="iconsize" icon={faCog} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/about'}><FontAwesomeIcon className="iconsize" icon={faInfo} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/signout'}><FontAwesomeIcon className="iconsize" icon={faSignOutAlt} /></Link>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

TopNav.propTypes = propTypes;

export default TopNav;

