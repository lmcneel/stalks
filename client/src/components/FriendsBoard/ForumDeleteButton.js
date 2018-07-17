import React, {Component} from 'react';
import {
    Input, Label, FormGroup, Button,
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus} from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';


// Main Forum Component to allow messages to be viewed and posted by user. may allow for reply
export class ForumDeleteButton extends Component {
    constructor(props) {
        super(props);
    };

componentDidMount() {


};


render() {
return (


    <Button> <FontAwesomeIcon
    icon={faMinus} /></Button>

);
}
};
