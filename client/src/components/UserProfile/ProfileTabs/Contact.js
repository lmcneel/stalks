import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import API from '../../../utils/API';
class Contact extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : props.user.email,
            topic : "General",
            message: "",
            submited: false,
            complete: false,
            processing: false,
            errors: [],
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
        const message = {
            user_email: this.state.email,
            topic: this.state.topic,
            message: this.state.message, 
        };
        this.setState({submited: true, processing: true});
        API.newUserMessage(message)
        .then((res) => {
            if (res.data.msg === 'Message has been recieved') {
                this.setState({complete: true, processing: false});
            } else {
                const err = [res.data.msg];
                this.setState({errors: err, processing: false});
            };
        })
        .catch((err) => {
            console.log(err);
            const error = ['There has been an error please try again later.'];
            this.setState({errors: error, processing: false});
        });
    };
    render(){
        const Errors = this.state.errors.map((err) => {
            return (
                <p className='input-errors' key={`send-message-${err}`}> {err} </p>
            );
        });
        return(
            <Col className="contact-us">
                {!this.state.complete ? (
                    <Form>
                        <FormGroup>
                            {Errors}
                        </FormGroup>
                        <FormGroup>
                        <Label>Email</Label>
                        <Input 
                            type="email" 
                            name="email" 
                            placeholder="email@here.please"
                            value={this.state.email}
                            disabled/>
                        </FormGroup>        
                        <FormGroup>
                        <Label>Topic</Label>
                        <Input 
                            type="select" 
                            name="topic"
                            value={this.state.topic}
                            onChange={this.handleInputChange}
                            disabled={this.state.processing}>
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
                            onChange={this.handleInputChange}
                            disabled={this.state.processing} />
                        </FormGroup>
                        <Button onClick={this.handleFormSubmit}>Submit</Button>
                    </Form>
                ) : (
                    <h3> Your message has been recieved! Please check your email! </h3>
                )}
            </Col>
        )
    }
};


export default Contact;