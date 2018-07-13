import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Label, Input, Button, Form, Tooltip} from 'reactstrap';
import API from '../../../../utils/API';
const propTypes = {
    email : PropTypes.string,
    goBack: PropTypes.func
};

class ChangeEmail extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            userEmail: props.email,
            showForm: false,
            emailVal: '',
            errors: [],
            errorsFound: false,
            class: '',
            processing: false
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.goBack = this.goBack.bind(this);
    };

    toggleForm(){
        this.setState({showForm: !this.state.showForm});
    };

    goBack(){
        this.props.goBack();
    };

    changeEmail(){
        const data = {
            current_email: this.state.userEmail,
            new_email: this.state.emailVal
        };
        API.updateEmail(data)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });

    };
    handleInputChange = event =>{
        const { value } = event.target;

        this.setState({emailVal : value});
    }
    checkValidInputs(){
        const val = this.state.emailVal;
        const errors = [];
        if(val.length === 0){
            errors.push('Email Field is Required');
        };
        if(!val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            errors.push('Please Input a valid email format name@domain.com');
        };

        if(errors.length > 0){
            this.setState({errors: errors,
            class: 'input-error',
            errorsFound: true});
        }else {
            this.setState({errors: errors,
            class: '',
            errorsFound: false,
            processing: true})

            this.changeEmail();
        }
    }
    render(){
        const errors = this.state.errors.map((err, index) => {
            return(
                <p key={`err-${index}`}>{err}</p>
            )
        });
        return(
            <div className='acount-form-container row'>
            {this.state.showForm ? (
                <div className="col-md-12">
                    <Form>
                        <FormGroup>
                            {this.state.errorsFound &&
                                <div className='errors-holder'>
                                    {errors}
                                </div>
                            }
                            <Label>New Desired Email</Label>
                            <Input
                                type={'email'}
                                name={'new email'}
                                placeholder={'email@here.please'}
                                value={this.state.emailVal}
                                onChange={this.handleInputChange}
                                className={this.state.class}
                                disabled={this.state.processing}/>
                        </FormGroup>
                        <Button onClick={this.checkValidInputs.bind(this)}>{this.state.processing ? 'Processing' : 'Submit'}</Button>                       
                    </Form>
                </div>
            ) : (
                <div className="col-md-12">
                    <h4>Your current email is <span>{this.state.userEmail}</span></h4>
                    <h3>Are you sure you want to change this? </h3>
                    <Button onClick={this.toggleForm} >Yes</Button> <Button onClick={this.goBack}>No</Button>
                </div>
            )}

            </div>
        )
    }
};


ChangeEmail.propTypes = propTypes;

export default ChangeEmail;