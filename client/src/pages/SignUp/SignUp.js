import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

/**
 * Trading Page
 */
class SignUp extends Component {
    /** Returns the Trading Center Component
     * @return {SignUp}
     */
    render() {
        return (
                <div id="container">
                <h3>Please fill out the form below to sign up.</h3>
                <Form className="signupForm" >
                    <FormGroup>
                        <Label for="exampleEmail">First Name</Label>
                        <Input type="firstname" name="firstname" id="firstName" placeholder="Bob" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Last Name</Label>
                        <Input type="lastname" name="lastname" id="lastName" placeholder="McBobby" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Bob@Bob.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input type="username" name="username" id="username" placeholder="CoolBob123" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="password" placeholder="*********" />
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <legend>Choose Your Pet</legend>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Ostrich
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Bear
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Wolf
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Bull
                        </Label>
                        </FormGroup>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                </div>
        );
    }
}
export default SignUp;

