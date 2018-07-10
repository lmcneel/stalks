import React from "react";
import {Nav } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faPaw, faMoneyBillWave, faUsers, faComments } from '@fortawesome/fontawesome-free-solid';
import "./SideNav.css";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const propTypes = {
    isActive: PropTypes.bool,
};

const SideNav = (props) => (
    <Nav id="sidebar" className={(props.isActive) ? `active` : ``}>
        <ul className="list-unstyled components">
            <li className="active">
                <Link to={`/petfolio`}><FontAwesomeIcon icon={faChartPie} />  Petfolio</Link>
            </li>
            <li className="">
                    <Link to={'/petcenter'}><FontAwesomeIcon icon={faPaw} />  Pet Center</Link>
            </li>
            <li className="">
                    <Link to={'/tradecenter'}><FontAwesomeIcon icon={faMoneyBillWave} />  Trade Center</Link>
            </li>
            <li className="">
                    <Link to={'/friends'}><FontAwesomeIcon icon={faUsers} />  Friends</Link>
            </li>
            <li className="">
                    <Link to={'/forum'}><FontAwesomeIcon icon={faComments} />  Forum</Link>
            </li>
        </ul>
    </Nav>
);

SideNav.propTypes = propTypes;

export default SideNav;
