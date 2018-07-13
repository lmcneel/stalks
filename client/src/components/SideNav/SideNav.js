import React from 'react';
import {Nav} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartPie, faPaw, faMoneyBillWave, faUsers, faComments} from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const propTypes = {
    isActive: PropTypes.bool,
};

const SideNav = (props) => (
    <Nav id="sidebar" className={(props.isActive) ? `active` : ``}>
        <ul className="components">
            <li className="active">
                <Link to={`/petfolio`}>
                <FontAwesomeIcon icon={faChartPie} className="sideNavicons"/>  Petfolio</Link>
            </li>
            <li className="">
                <a href="">
                    <FontAwesomeIcon icon={faPaw} className="sideNavicons" />  Pet Center
                </a>
            </li>
            <li className="">
                <a href="">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="sideNavicons" />  Trade Center
                </a>
            </li>
            <li className="">
                <a href="">
                    <FontAwesomeIcon icon={faUsers} className="sideNavicons" />  Friends
                </a>
            </li>
            <li className="">
                <a href="">
                    <FontAwesomeIcon icon={faComments} className="sideNavicons" />  Forum
                </a>
            </li>
        </ul>

    </Nav>
);

SideNav.propTypes = propTypes;

export default SideNav;
