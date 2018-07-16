import React, {Component} from 'react';
import {
    Input, Label, FormGroup, Button,
} from 'reactstrap';
import API from '../../utils/API';


// Main Forum Component to allow messages to be viewed and posted by user. may allow for reply
export class ForumPostButton extends Component {
    constructor(props) {
        super(props);
    };

componentDidMount() {


};


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

