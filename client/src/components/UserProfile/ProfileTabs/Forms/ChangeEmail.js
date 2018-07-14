import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Label, Input, Button, Form} from 'reactstrap';
import API from '../../../../utils/API';
const propTypes = {
    email: PropTypes.string,
    goBack: PropTypes.func,
};
/**
 * @return {*} Cntainer
 */
class ChangeEmail extends Component {
    /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            userEmail: props.email,
            showForm: false,
            emailVal: '',
            errors: [],
            errorsFound: false,
            class: '',
            processing: false,
            unknownErr: false,
            verificationLinkSent: false,
        },
        this.toggleForm = this.toggleForm.bind(this);
        this.goBack = this.goBack.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    /**
     * Function that toggles the form for the component
     */
    toggleForm() {
        this.setState({showForm: !this.state.showForm});
    };

    /**
     * Function that essentionaly unmounts the component
     * using one of the components props
     */
    goBack() {
        this.props.goBack();
    };

    /**
     * Function that finalizes change of email through API call
     */
    sendEmailLink() {
        const data = {
            current_email: this.state.userEmail,
            emailToVerify: this.state.emailVal,
        };
        API.requestEmailVerification(data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                if (err) {
                    this.setState({unknownErr: true});
                };
            });
    };
    /**
     * Function that handles all input change and puts it into the proper state
     * @param { object } event
     */
    handleInputChange(event) {
        const {value} = event.target;

        this.setState({emailVal: value});
    };

    /**
     * Function that checks for valid email input
     */
    checkValidInputs() {
        const val = this.state.emailVal;
        const errors = [];
        if (val.length === 0) {
            errors.push('Email Field is Required');
        };
        if (!val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            errors.push('Please Input a valid email format name@domain.com');
        };

        if (errors.length > 0) {
            this.setState({errors: errors,
            class: 'input-error',
            errorsFound: true});
        } else {
            this.setState({errors: errors,
            class: '',
            errorsFound: false,
            processing: true});

            this.sendEmailLink();
        }
    }
    /**
     * @return {*} Container
     */
    render() {
        const errors = this.state.errors.map((err, index) => {
            return (
                <p key={`err-${index}`}>{err}</p>
            );
        });
        return (
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
                                {
                                    this.state.unknownErr &&
                                    <div className='errors-holder'>
                                        <h3 className='error'>
                                            There was an issue with you request. Please try again later or attempt to contact us.
                                        </h3>
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
                                    disabled={(this.state.processing || this.state.unknownErr)}/>
                            </FormGroup>
                            <Button onClick={this.checkValidInputs.bind(this)}>
                                {this.state.processing ? 'Processing' : 'Submit'}
                            </Button>
                        </Form>
                    
                </div>
            ) : (
                <div className="col-md-12">
                    <h4>Your current email is <span>{this.state.userEmail}</span>. If you choose to change your email,
                        you will be required to verify your email to verify your email.</h4>
                    <h3>Are you sure you want to change this? </h3>
                    <Button onClick={this.toggleForm} >Yes</Button> <Button onClick={this.goBack}>No</Button>
                </div>
            )}

            </div>
        );
    }
};


ChangeEmail.propTypes = propTypes;

export default ChangeEmail;
