import React from "react";
import {Nav } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faPaw, faMoneyBillWave, faUsers, faComments } from '@fortawesome/fontawesome-free-solid';
import "./SideNav.css";
import PropTypes from 'prop-types';

const propTypes = {
    isActive: PropTypes.bool,
};

const SideNav = (props) => (
    <Nav id="sidebar" className={(props.isActive) ? `active` : ``}>
        <ul className="list-unstyled components">
            <li className="active">
                <a href="">
                    <FontAwesomeIcon icon={faChartPie} />  Petfolio
                </a>
            </li>
            <li className="">
                <a href="">
                    <FontAwesomeIcon icon={faPaw} />  Pet Center
                </a>
            </li>
            <li className="">
                <a href="">
                    <FontAwesomeIcon icon={faMoneyBillWave} />  Trade Center
                </a>
            </li>
            <li className="">
                <a href="">
                    <FontAwesomeIcon icon={faUsers} />  Friends
                </a>
            </li>
            <li className="">
                <a href="">
                    <FontAwesomeIcon icon={faComments} />  Forum
                </a>
            </li>
        </ul>

    </Nav>
);

SideNav.propTypes = propTypes;

export default SideNav;
