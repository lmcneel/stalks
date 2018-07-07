import React, { Component } from "react";
import API from "../../utils/API";
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';


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
                    <InputGroupAddon addonType="prepend"><i class="fas fa-at"></i></InputGroupAddon>
                    <Input 
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name='username'
                        placeholder='username' />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><i class="fas fa-key"></i></InputGroupAddon>
                    <Input 
                        value={this.state.username}
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
                    <i class="fab fa-google">Google</i>
                </Button>
                <Button
                    onClick={this.handleFormSubmit} >
                    <i class="fab fa-facebook-f">Facebook</i>

                </Button>
            </div>
        );
    };
}

export default SigninForm;