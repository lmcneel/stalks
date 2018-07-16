import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
class Contact extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : props.user.email,
            topic : "General",
            message: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    // handle any changes to the input fields
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;

        // Set the state for the appropriate input field
        this.setState({
        [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
    };
    render(){
        return(
            <Col className="contact-us">
                <Form>
                    <FormGroup>
                    <Label>Email</Label>
                    <Input 
                        type="email" 
                        name="email" 
                        placeholder="email@here.please"
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                    </FormGroup>        
                    <FormGroup>
                    <Label>Topic</Label>
                    <Input 
                        type="select" 
                        name="topic"
                        value={this.state.topic}
                        onChange={this.handleInputChange}>
                        <option value="General">General</option>
                        <option value="Account">Account</option>
                        <option value="Stock Market">Stock Market</option>
                        <option value="Forum">Forum</option>
                        <option value="Other">Other</option>
                    </Input>
                    </FormGroup>
                    <FormGroup>
                    <Label>Message</Label>
                    <Input 
                        type="textarea" 
                        name="message" 
                        value={this.state.message}
                        onChange={this.handleInputChange} />
                    </FormGroup>
                    <Button onClick={this.handleFormSubmit}>Submit</Button>
                </Form>
            </Col>
        )
    }
};


export default Contact;