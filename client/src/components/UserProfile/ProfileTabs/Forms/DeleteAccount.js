import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Label, Input, Button, Form, Tooltip} from 'reactstrap';
import API from '../../../../utils/API';

const propTypes = {
    email : PropTypes.string,
    goBack: PropTypes.func
}


class DeleteAcc extends Component{
    constructor(props){
        super(props);
        this.state = {
            userEmail: props.email,
            processing: false,
            accountDeleted:false,
            codeProcessing: false,
            showForm: false,
            inputs: {
                current_password: {
                    name: 'current password',
                    value: ''
                },
                current_username: {
                    name: 'current username',
                    value: ''
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
        const data = {
            current_username: this.state.inputs.current_username.value,
            current_password: this.state.inputs.current_password.value
        };

        API.deleteAccount(data)
            .then(response => {
                console.log(response);
                if(response.data.message === 'Deleted Account'){
                    this.setState({accountDeleted: true});
                }else {
                    console.log('lol');
                }                
            })
            .catch(err=> {
                console.log(err);
            })
 

        
    };
   
    render(){
        const password = this.state.inputs.current_password;
        const username = this.state.inputs.current_username;

        return(
            <div className='account-form-container-row'>
                {this.state.showForm ? (
                    <div className='col-md-12'>
                        <Form>
                            <FormGroup>
                                <Label>Current Username</Label>
                                <Input
                                    type={`text`}
                                    name={`current username`}
                                    value={username.value}
                                    onChange={this.handleInputChange}
                                    className={` `}
                                    disabled={this.state.processing}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Current Password</Label>
                                <Input
                                    type={`password`}
                                    name={`current password`}
                                    value={password.value}
                                    onChange={this.handleInputChange}
                                    className={` `}
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
                                <h4>In order to Delete your account you must request a verification code to be sent to your email at 
                                    <span>{this.state.userEmail}</span></h4>
                                <h3>Would you like to proceed? </h3>
                                <Button onClick={this.sendCode} >Send Code</Button> <Button onClick={this.goBack}>No</Button>
                            </div>
                        )}
                       
                    </div>
                )}
                {this.state.accountDeleted && 
                    <div>
                        <h2>Your username has successfully been changed!</h2>
                    </div>
                }
            </div>
        )
    }
};


DeleteAcc.propTypes = propTypes;

export default DeleteAcc;