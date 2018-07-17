import React, {Component} from 'react';
<<<<<<< HEAD
import {
    Input, Label, FormGroup, Button,
} from 'reactstrap';
=======
// import {
//     Input, Label, FormGroup, Button,
// } from 'reactstrap';
>>>>>>> 47c9995ca76287993eb1400dc3dab6c6a93c2d1c
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

<<<<<<< HEAD

    <Button> <FontAwesomeIcon
    icon={faMinus} /></Button>
=======
     <FontAwesomeIcon
    icon={faWindowClose} />
>>>>>>> 47c9995ca76287993eb1400dc3dab6c6a93c2d1c

);
}
};
