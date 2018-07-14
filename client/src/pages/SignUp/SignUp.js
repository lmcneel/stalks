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
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText" />
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

