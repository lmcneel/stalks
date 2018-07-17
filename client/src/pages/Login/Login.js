import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import API from '../../utils/API';

/**
 * Trading Page
 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailErr: '',
            password: '',
            passwordErr: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };


    handleFormSubmit = (event) => {
        event.preventDefault();
        //if search was clicked
        //TODO: add code to handle api route for signup
        
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            pet: this.state.pet
        };
        console.log(data);
        API.signup(data).then((response) =>{
            console.log(response.data);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        });
            

    };
    /** Returns the Trading Center Component
     * @return {Login}
     */
    render() {
        return (
            <div>
                <div id="container">
                <Form className="signupForm" >
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            placeholder="Bob@Bob.com"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        placeholder="*********" />
                    </FormGroup>
                    <Button onClick={this.handleFormSubmit}>Submit</Button>
                </Form>
                </div>
            </div>
        );
    }
}
export default Login;

