import React, {Component} from 'react';
// import {
//     Input, Label, FormGroup, Button,
// } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/fontawesome-free-solid';
// import API from '../../utils/API';

/**
 * Class ForumDeleteButton
 * Main Forum Component to allow messages to be viewed and posted by user. may allow for reply
 */
export class ForumDeleteButton extends Component {
    /**
    *@param {*} props
    */
    constructor(props) {
        super(props);
    };

/**
 * Mount component
 */
componentDidMount() {
    /**
     * function to go here
     */
};

/**
 * Render function for App Component
 * @return {JSX}
 */
render() {
return (

     <FontAwesomeIcon
    icon={faWindowClose} />

);
}
};
