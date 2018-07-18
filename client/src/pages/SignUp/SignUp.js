import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import API from '../../utils/API';
import PropTypes from 'prop-types';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';



/**
 * Signup Page
 */
class SignUp extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            firstname: '',
            firstNameErr: '',
            lastname: '',
            lastNameErr: '',
            email: '',
            emailErr: '',
            username: '',
            usernameErr: '',
            password: '',
            passwordErr: '',
            pet: '',
            petErr: '',
            signupErr: false,
            signUpErrors: [],
            signUpComplete: false,
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
            const errors = [];
            if (response.data === 'Username is taken' || response.data === 'Email in user') {
                errors.push(response.data);
                this.setState({signupErr: true,
                signUpErrors: errors});
            };

            if (errors.length === 0) {
                this.setState({signupErr: false, signUpErrors: errors},
                () => {

                });
                this.props.history.push('/');
                window.location.reload();
            };
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        });
            

    };

    toggleVerify() {
        this.setState({toggleVerifyModal: !this.state.toggleVerifyModal});
    };
    /** Returns the Trading Center Component
     * @return {SignUp}
     */
    render() {
        const Errors = this.state.signUpErrors.map(err => {
            return (
                <p key={`sign-up-${err}`}> {err} </p>
            );
        });
        return (
                <div id="container">
                <h3>Please fill out the form below to sign up.</h3>
                {this.state.signUpComplete && (
                     <Modal isOpen={this.state.toggleVerifyModal} toggle={this.toggleVerify}>
                        <ModalHeader toggle={this.toggleVerify}>
                        Please remember to verify your email with us!</ModalHeader>
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleVerify}>Close</Button>
                        </ModalFooter>
                    </Modal>
                )}
                <Form className="signupForm" >
                    {this.state.signupErr && (
                        <div className='form-errors'>
                            {Errors}
                        </div>
                    )}
                    <FormGroup>
                        <Label for="exampleEmail">First Name</Label>
                        <Input 
                            type="text"
                            name="firstname" 
                            id="firstName"
                            value={this.state.firstname}
                            onChange={this.handleInputChange}
                            placeholder="Bob" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Last Name</Label>
                        <Input 
                            type="lastname"
                            name="lastname"
                            id="lastName"
                            value={this.state.lastname}
                            onChange={this.handleInputChange}
                            placeholder="McBobby" />
                    </FormGroup>
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
                        <Label for="exampleEmail">Username</Label>
                        <Input
                            type="username"
                            name="username"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            placeholder="CoolBob123" />
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
                    <FormGroup tag="fieldset">
                        <legend>Choose Your Pet</legend>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="pet" value='Ostrich' onChange={this.handleInputChange}/>{' '}
                            Ostrich
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="pet" value='Bear' onChange={this.handleInputChange}/>{' '}
                            Bear
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="pet" value='Wolf' onChange={this.handleInputChange}/>{' '}
                            Wolf
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="pet" value='Bull'onChange={this.handleInputChange}/>{' '}
                            Bull
                        </Label>
                        </FormGroup>
                    </FormGroup>
                    <Button onClick={this.handleFormSubmit}>Submit</Button>
                </Form>
                </div>
        );
    }
}

SignUp.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
export default withRouter(SignUp);

