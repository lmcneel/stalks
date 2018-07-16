import React, {Component} from 'react';
import {
    Button,
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';



// Main Forum Component to allow messages to be viewed and posted by user. may allow for reply
export class ForumEditButton extends Component {
    constructor(props) {
        super(props);
    };

componentDidMount() {


};


render() {
return (


    <FontAwesomeIcon
    icon={faEdit} />

)
}
};
