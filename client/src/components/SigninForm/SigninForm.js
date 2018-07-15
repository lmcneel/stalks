import React, { Component } from "react";
import API from "../../utils/API";
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SigninForm extends Component {
    state={
        username:'',
        password:''
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        //if search was clicked
        console.log("login clicked");
        //TODO: add code to handle api route for login
        API.login(this.state.props);

    };

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><FontAwesomeIcon icon='faAt'/></InputGroupAddon>
                    <Input 
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name='username'
                        placeholder='username' />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><FontAwesomeIcon icon='faKey' /></InputGroupAddon>
                    <Input 
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name='password'
                        placeholder='password' />
                </InputGroup>
                <Button className='login-button'>Login</Button>
                
                <p className='login-text'>
                    or login with
                </p>               
                <Button
                    onClick={this.handleFormSubmit} >
                    <FontAwesomeIcon icon='faGoogle' />Google
                </Button>
                <Button
                    onClick={this.handleFormSubmit} >
                    <FontAwesomeIcon icon='faFacebookF' />Facebook
                </Button>
            </div>
        );
    };
}

export default SigninForm;