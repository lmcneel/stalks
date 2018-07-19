import React, { Component } from "react";
import API from "../../utils/API";
import {
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
    Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SignoutForm extends Component {
    state={
        username:'',
        password:''
    };


    handleFormSubmit = (event) => {
        event.preventDefault();
        //if search was clicked
        console.log("login clicked");
        //TODO: add code to handle api route for login
        API.logout(this.state.props);

    };

    render() {
        return (
            <div>
                <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Logout</CardTitle>
                        <CardText>You have been successfully logged out.</CardText>
                        <Button onClick={this.handleFormSubmit}>Ok</Button>
                    </CardBody>
                </Card>
            </div>
        );
    };
}

export default SignoutForm;