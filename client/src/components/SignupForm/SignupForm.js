import React, { Component } from "react";
import API from "../../utils/API";
import { 
    FormFeedback,
    InputGroupAddon, 
    Button 
    } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';


class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
                username:'',
                usernameError:'',
                password:'',
                passwordError:'',
                pet:'',
                petError:''
        }
    };

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    validate = () => {
        let isError = false;
        const errors = {};
        const pass = this.state.password;
        if (this.state.username.length < 5) {
            console.log('username error');
            isError = true;
            errors.usernameError = 'Username must be greater than 5 characters';
            document.getElementById('username').setAttribute('valid', false);
            document.getElementById('username').setAttribute('invalid', true);
            console.log(document.getElementById('username'));
        }
        else{
            document.getElementById('username').setAttribute('valid', true);
            document.getElementById('username').setAttribute('invalid', false);
            errors.usernameError = '';
        }
        if (!(pass.match(/[\w\W]{8,}/) && (pass.match(/[A-Z]/g)) && pass.match(/[a-z]/))) {
            console.log('password error');
            isError = true;
            errors.passwordError = 'Password must contain an uppercase, lowercase and be at least 8 characters';
        }
        else {
            errors.passwordError = '';
        }
        if(this.state.pet === ''){
            console.log('pet error');
            isError = true;
            errors.petError = 'Please select a pet character'
        }
        else {
            errors.petError = '';
        }
        if(isError){
            this.setState({
                ...this.state,
                ...errors
            });
        }
        return isError;
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const err = this.validate();
        //if search was clicked
        console.log(`Signup initiated with: ${this.state.username} ${this.state.password} ${this.state.pet}`);
        //TODO: add code to handle api route for signup
        if(!err){
            console.log('calling api signup post method')
            const data = {
                email: this.state.username,
                password: this.state.password,
            };
            API.signup(data).then((response) =>{
                console.log(response);
            });
        }
        else
        {
            console.log('form errors');
            console.log(this.state.usernameError);
            console.log(this.state.passwordError);
            console.log(this.state.petError);
            console.log(this.state.props);
        }
            

    };

    render() {
        return (
            <div>
                <AvForm>
                    <AvGroup>
                        <InputGroupAddon addonType='prepend'><i className='fas fa-at'></i></InputGroupAddon>
                        <AvInput
                            id='username'
                            type='text'
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            name='username'
                            placeholder='username@idk.com' 
                            validate={{ pattern: { value: /^[A-Z]*$/ } }} 
                            />
                        <FormFeedback invalid>{this.state.usernameError}</FormFeedback>
                    </AvGroup>
                    <br />
                    <AvGroup>
                        <InputGroupAddon addonType='prepend'><i className='fas fa-key'></i></InputGroupAddon>
                        <AvInput 
                            id='password' 
                            type='password' 
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name='password'
                            placeholder='Create a password'
                            //(/[\w\W]{8,}/) && (pass.match(/[A-Z]/g)) && pass.match(/[a-z]/))
                            validate={{ pattern: { value: /^[A-z]*$/ } }} 
                            />
                        <FormFeedback invalid>{this.state.passwordError}</FormFeedback>
                    </AvGroup>
                    <br />
                    <AvGroup>
                        <AvField type="select" name="pet" label="Trading Pet" onChange={this.handleInputChange}>
                            <option value='' >Select a pet...</option>
                            <option value='Wolf' >Wolf</option>
                            <option value='Bear' >Bear</option>
                            <option value='Ostrich' >Ostrich</option>
                            <option value='Bull' >Bull</option>
                        </AvField>
                        <FormFeedback invalid>{this.state.petError}</FormFeedback>
                    </AvGroup>
                    <br />
                    <Button id='signupButton'
                        className='login-button'
                        onClick = {this.handleFormSubmit}>
                        Signup
                    </Button>
                </AvForm>
            </div>
        );
    };
}

export default SignupForm;

