import React, {Component} from 'react';
import {
    Input, Label, FormGroup, Button,
} from 'reactstrap';
// import API from '../../utils/API';


/**
 * Class ForumPostButton
 * Main Forum Component to allow messages to be viewed and posted by user. may allow for reply
 *
 */
export class ForumPostButton extends Component {
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
};

/**
 * Render function for App Component
 * @return {JSX}
 */
render() {
return (


<div>
     <FormGroup>
         <Label for="exampleText">Text Area</Label>
         <Input type="textarea" name="text" id="exampleText" />
     </FormGroup>
     <Button type= 'submit'>POST</Button>
 </div>

);
}
};

