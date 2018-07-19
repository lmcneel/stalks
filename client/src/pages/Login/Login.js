import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import API from '../../utils/API';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

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
            signinErr: false,
            signinErrors: [],
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


    componentDidMount() {

    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        //if search was clicked
        //TODO: add code to handle api route for signup
        
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log(data);
        API.signin(data).then((response) =>{
            console.log(response.data);
            const errors = [];
            if (response.data === 'That email is not in our system.' || response.data === 'Incorrect Password') {
                errors.push(response.data);
                this.setState({signinErr: true,
                signinErrors: errors});
            };

            if (errors.length === 0) {
                this.setState({signinErr: false, signinErrors: errors});
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
    /** Returns the Trading Center Component
     * @return {Login}
     */
    render() {
        const Errors = this.state.signinErrors.map(err => {
            return (
                <p key={`sign-in-${err}`}> {err} </p>
            );
        });
        return (
            <div>
                <Form className="signupForm" >
                    {this.state.signinErr && (
                        <div className='form-errors'>
                            {Errors}
                        </div>
                    )}
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
                    <Button className="mb-4 col-12 bg-primary border-0" onClick={this.handleFormSubmit}>Submit</Button>
                </Form>
                <hr />
                <h4 className="py-3 text-center">Get a stock market pet today!</h4>
                </div>
        );
    }
}

Login.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
export default withRouter(Login);
