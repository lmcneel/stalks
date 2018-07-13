import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Label, Input, Button, Form, Tooltip} from 'reactstrap';
import API from '../../../../utils/API';

const propTypes = {
    email : PropTypes.string,
    goBack: PropTypes.func
}


class ChangeUsername extends Component{
    constructor(props){
        super(props);
        this.state = {
            userEmail: props.email,
            processing: false,
            usernameChanged:false,
            codeProcessing: false,
            showForm: false,
            inputs: {
                current_password: {
                    name: 'current password',
                    correct: false,
                    value: ''
                },
                new_username: {
                    name: 'new username',
                    value: '',
                    errorsFound: false,
                    class: ''
                },
                confirm_new_username: {
                    name: 'confirm new username',
                    value: '',
                    errorsFound: false,
                    class: ''
                }
            },
            errors: [],
            code: {
                value: '',
                class: '',
                
            },
            codeSent: false
 
        };
        this.toggleProccessing = this.toggleProccessing.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.goBack = this.goBack.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.checkCode = this.checkCode.bind(this);
        this.checkValidInput = this.checkValidInput.bind(this);

       
    };

    toggleProccessing(){
        this.setState({processing: !this.state.processing});
    };
    toggleCodeProccessing(){
        this.setState({processing: !this.state.codeProcessing});
    };

    toggleForm(){
        this.setState({showForm: !this.state.showForm});
    };

    goBack(){
        this.props.goBack();
    };

    //HANDLE INPUT CHANGES
    handleInputChange = event => {
        const newInputs = this.state.inputs;
        const { name, value } = event.target;

        for(let c in newInputs){
            if(newInputs[c].name === name){
                newInputs[c].value = value;
            };
        };

        this.setState({
        inputs: newInputs
        });

        console.log(this.state.inputs);
    };

    handleCode = event => {
        const { value } = event.target;
        const newCode = this.state.code;
        if( value.length <=6 ){
            newCode.value = value;
            this.setState({code : newCode});
        }        
    };



    sendCode(){
       this.toggleCodeProccessing();

        const data = {
            current_email: this.state.userEmail,
            verificationType: 'new username'
        };
        API.requestUpdateVerification(data)
        .then(response => {
            console.log(response);
            this.toggleCodeProccessing();
            this.setState({

                codeSent: true})

            
        })
        .catch(err => {
            console.log(err);
        });
    };

    checkCode(){
       this.toggleCodeProccessing();

        const data = {
            current_email: this.state.userEmail,
            verificationType: 'new password',
            inputedCode: this.state.code.value
        };
        API.confirmUpdateVerification(data)
            .then(response =>{
                console.log(response);
               this.toggleCodeProccessing();
                this.setState({
                    codeSent: true});

                //Check response and do what it do what you gotta do

            })
            .catch(err => {
                console.log(err);
            });
    };

    checkValidInput(){

        this.toggleProccessing();

        if(!this.state.current_password.correct){

            this.checkCurrentPassword();

        }else {

            const formInputs = this.state.inputs;
            const errors = [];
            const newUser = formInputs.new_username.value;
            const confirmNewUser = formInputs.confirm_new_username.value;

            if(!newUser.match(/^[a-zA-Z0-9_.-]{6,15}$/)){

                newUser.errorsFound = true;
                errors.push('Username must be between 6 - 15 characters.');
                errors.push('Username cannot include special characters; _ - , are allowed.');

            }else if(newUser !== confirmNewUser){

                newUser.errorsFound = true;
                confirmNewUser.errorsFound = true;
                errors.push('Usernames do not match.');

            };

            if(errors.length === 0){

                this.changeUsername();

            }else {

                this.setState({inputs: formInputs,
                errors: errors});
                this.toggleProccessing();

            };

        };

        
    };
   
    checkCurrentPassword(){
        const data = {
            current_email: this.state.userEmail,
            passwordInput: this.state.current_password.value
        };

        API.checkPassword(data)
            .then(response =>{

                //Response.data should be 
                    // { message : 'Match' } or { message : 'Current password inputed does not match'}
                console.log(response.data);
                //If password matches check rest of inputs
                if(response.data.message === 'Match'){

                    this.checkValidInput();

                }else {
                    //If it doesnt update current_password error and toggle proccescor off

                    const inputs = this.state.inputs;
                    inputs.current_password.correct = false;
                    const errors = [];
                    errors.push(response.data.message);

                    this.setState({inputs: inputs,
                    errors: errors});
                    this.toggleProccessing();
                }
            
                
            })
            .catch(err => {

                console.log(err);
                const error = ['There has been an issue with your request. Please try again later'];
                this.setState({errors: error});

            });
    };

    changeUsername(){

        const data = {
            current_email: this.state.userEmail,
            current_password: this.state.inputs.current_password.value,
            new_username: this.state.inputs.new_username.value
        };

        API.updateUsername(data)
            .then(response =>{
                console.log(response);
                this.toggleProccessing();
                this.setState({usernameChanged: true});
            })
            .catch(err => {
                console.log(err);
                const error = ['There has been an issue with your request. Please try again later'];
                this.setState({errors: error});
            });
    };
    render(){
        const currentPassword = this.state.inputs.current_password;
        const new_username = this.state.inputs.new_username;
        const confirmUsername = this.state.inputs.confirm_new_username;

        return(
            <div className='account-form-container-row'>
                {this.state.showForm ? (
                    <div className='col-md-12'>
                        <Form>
                            <FormGroup>
                                <Label>Current Password</Label>
                                <Input
                                    type={`password`}
                                    name={`current password`}
                                    value={currentPassword.value}
                                    onChange={this.handleInputChange}
                                    className={` `}
                                    disabled={this.state.processing}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>New Username</Label>
                                <Input
                                    type={`text`}
                                    name={`new username`}
                                    value={new_username.value}
                                    onChange={this.handleInputChange}
                                    className={new_username.class}
                                    disabled={this.state.processing}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Confirm New Username</Label>
                                <Input
                                    type={`text`}
                                    name={`confirm new username`}
                                    value={confirmUsername.value}
                                    onChange={this.handleInputChange}
                                    className={confirmUsername.class}
                                    disabled={this.state.processing}/>
                            </FormGroup>
                            <Button onClick={this.checkValidInput} disabled={this.state.processing}>{this.state.processing ? 'Processing' : 'Submit'}</Button>                       
                        </Form>
                    </div>
                 ) : (
                    <div className="col-md-12">
                        {this.state.codeSent ? (
                            <div>
                                <h4> A Code has been sent to your email at {this.state.userEmail}</h4>
                                <FormGroup>
                                    <Label>Please input the code sent to you</Label>
                                    <Input 
                                        type={`text`}
                                        name={`code`}
                                        onChange={this.handleCode}
                                        value={this.state.code.value}
                                        className={this.state.code.class}
                                        disabled={this.state.codeProcessing} />
                                    <Button onClick={this.checkCode} disabled={this.state.codeProcessing}> {this.state.codeProcessing ? 'Processing' : 'Submit Code'}</Button> <Button onClick={this.sendCode} />
                                </FormGroup>
                            </div>
                        ) : (
                            <div>
                                <h4>In order to change your username you must request a verification code to be sent to your email at 
                                    <span>{this.state.userEmail}</span></h4>
                                <h3>Would you like to proceed? </h3>
                                <Button onClick={this.sendCode} >Send Code</Button> <Button onClick={this.goBack}>No</Button>
                            </div>
                        )}
                       
                    </div>
                )}
                {this.state.usernameChanged && 
                    <div>
                        <h2>Your username has successfully been changed!</h2>
                    </div>
                }
            </div>
        )
    }
};


ChangeUsername.propTypes = propTypes;

export default ChangeUsername;