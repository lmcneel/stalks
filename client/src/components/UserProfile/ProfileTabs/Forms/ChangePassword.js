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
class ChangePassword extends Component {
    /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            userEmail: props.email,
            processing: false,
            passwordChanged: false,
            codeProcessing: false,
            showForm: false,
            inputs: {
                current_password: {
                    name: 'current password',
                    correct: false,
                    value: '',
                    errorsFound: false,
                    class: '',
                },
                new_password: {
                    name: 'new password',
                    value: '',
                    errorsFound: false,
                    class: '',
                },
                confirm_new_password: {
                    name: 'confirm new password',
                    value: '',
                    errorsFound: false,
                    class: '',
                },
            },
            errors: [],
            code: {
                value: '',
                class: '',
            },
            codeSent: false,
            codeErr: [],
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

    /**
     * Function That Toggles state proccessing between true and false
     */
    toggleProccessing() {
        this.setState({processing: !this.state.processing});
    };

    /**
     * Function that toggle state codeProcessing between true and false
     */
    toggleCodeProccessing() {
        this.setState({processing: !this.state.codeProcessing});
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
     * Function that handles all input change and puts it into the proper state
     * @param { object } event
     */
    handleInputChange(event) {
        const newInputs = this.state.inputs;
        const {name, value} = event.target;

        for (let c in newInputs) {
            if (newInputs[c].name === name) {
                newInputs[c].value = value;
            };
        };

        this.setState({
        inputs: newInputs,
        });

        console.log(this.state.inputs);
    };

    /**
     * Function the handles the input for when user is inputing code
     * @param { object } event
     */
    handleCode(event) {
        const {value} = event.target;
        const newCode = this.state.code;
        if ( value.length <=6 ) {
            newCode.value = value;
            this.setState({code: newCode});
        };
    };

    /**
     * Function that toggles CodeProccession to disable any UI interactions on this component
     * and sends a call to API to email user the Code
     */
    sendCode() {
        this.toggleCodeProccessing();
        const data = {
            current_email: this.state.userEmail,
            verificationType: 'new password',
        };
        console.log(data);
        API.requestUpdateVerification(data)
        .then((res) => {
            console.log(res);
            this.toggleCodeProccessing();
            this.setState({codeSent: true});
        })
        .catch((err) => {
            console.log(err);
        });
    };
    /**
     * Function that toggles CodePreccessing to disable any UI interactions on this component
     * Then makes a call to API to check the users inputed Code to verify that is is correct
     */
    checkCode() {
       this.toggleCodeProccessing();

        const data = {
            current_email: this.state.userEmail,
            verificationType: 'new password',
            inputedCode: this.state.code.value,
        };
        API.confirmUpdateVerification(data)
            .then((response) =>{
                console.log(response);
                if (response.data === 'Correct Code') {
                    this.setState({showForm: true, processing: false, codeProcessing: false});
                } else {
                    const codeErr = [response.data];
                    this.setState({codeErr: codeErr, codeProcessing: false});
                };
                // Check response and do what it do what you gotta do
            })
            .catch((err) => {
                console.log(err);
            });
    };
    /**
     * Function that check inputs starting the users inputed current password
     * The function goes to this.checkCurrentPassword to verify the users password before continueing
     * Once state.current_psassword.correct is true it will continue and verify the rest of the inputs
     */
    checkValidInput() {
        this.toggleProccessing();

        if (!this.state.current_password.correct) {
            this.checkCurrentPassword();
        } else {
            const formInputs = this.state.inputs;
            const errors = [];
            const newPass = formInputs.new_password.value;
            const confirmNewPass = formInputs.confirm_new_password.value;

            if (!newPass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
                newPass.errorsFound = true;
                errors.push('Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.');
                errors.push('Password must be at least 8 characters.');
            } else if (newPass !== confirmNewPass) {
                newPass.errorsFound = true;
                confirmNewPass.errorsFound = true;
                errors.push('Passwords do not match.');
            };

            if (errors.length === 0) {
                this.changePassword();
            } else {
                this.setState({inputs: formInputs,
                errors: errors}, () => {
                    this.toggleProccessing();
                });
            };
        };
};
    /**
     * Function that checks the users password found in components state
     * by sending it through an API
     */
    checkCurrentPassword() {
        const data = {
            current_email: this.state.userEmail,
            passwordInput: this.state.current_password.value,
        };

        API.checkPassword(data)
            .then((response) => {
                // Response.data should be
                    // { message : 'Match' } or { message : 'Current password inputed does not match'}
                console.log(response.data);
                // If password matches check rest of inputs
                if (response.data.message === 'Match') {
                    const pass = this.state.current_password;
                    pass.correct = true;
                    this.setState({current_password: pass}, () => {
                        this.checkValidInput();
                    });
                } else {
                    // If it doesnt update current_password error and toggle proccescor off

                    const inputs = this.state.inputs;
                    inputs.current_password.correct = false;
                    const errors = [];
                    errors.push(response.data.message);

                    this.setState({inputs: inputs,
                    errors: errors}, () => {
                        this.toggleProccessing();
                    });
                };
            })
            .catch((err) => {
                console.log(err);
                const error = ['There has been an issue with your request. Please try again later'];
                this.setState({errors: error});
            });
    };
    /**
     * Function that finalizes change of username through an API
     */
    changePassword() {
        const data = {
            current_email: this.state.userEmail,
            current_password: this.state.inputs.current_password.value,
            new_password: this.state.inputs.new_password.value,
        };

        API.updatePassword(data)
            .then((response) =>{
                console.log(response);
                if (response.data.message === 'Password Changed') {
                    this.setState({passwordChanged: true}, () => {
                        this.toggleProccessing();
                    });
                } else {
                    const errors = [response.data.message];
                    this.setState({errors: errors}, () => {
                        this.toggleProccessing();
                    });
                };
            })
            .catch((err) => {
                console.log(err);
                const error = ['There has been an issue with your request. Please try again later'];
                this.setState({errors: error}, () => {
                    this.toggleProccessing();
                });
            });
    };
    /**
     * @return {*} Container
     */
    render() {
        const currentPassword = this.state.inputs.current_password;
        const newPassword = this.state.inputs.new_password;
        const confirmPassword = this.state.inputs.confirm_new_password;
        const inputErrors = this.state.errors.map((err) => {
            return (
                <p className='input-errors' key={`change-password-${err}`}> {err} </p>
            );
        });
        const codeErrors = this.state.codeErr.map((err) => {
            return (
                <p className='input-errors' key={`confirmation-code-${err}`}> {err} </p>
            );
        });
        return (
            <div className='account-form-container-row'>
                <h3> Change password </h3>
                {this.state.showForm ? (
                    <div className='col-md-12'>
                        <Button onClick={this.goBack}> Back </Button>
                        <Form>
                            <FormGroup>
                                {inputErrors}
                            </FormGroup>
                            <FormGroup>
                                <Label>Current Password</Label>
                                <Input
                                    type={`password`}
                                    name={`current password`}
                                    value={currentPassword.value}
                                    onChange={this.handleInputChange}
                                    className={currentPassword.class}
                                    disabled={this.state.processing}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>New Password</Label>
                                <Input
                                    type={`password`}
                                    name={`new password`}
                                    value={newPassword.value}
                                    onChange={this.handleInputChange}
                                    className={newPassword.class}
                                    disabled={this.state.processing}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Confirm New Password</Label>
                                <Input
                                    type={`password`}
                                    name={`confirm new password`}
                                    value={confirmPassword.value}
                                    onChange={this.handleInputChange}
                                    className={confirmPassword.class}
                                    disabled={this.state.processing}/>
                            </FormGroup>
                            <Button onClick={this.checkValidInput} disabled={this.state.processing}>
                                {this.state.processing ? 'Processing' : 'Submit'}
                            </Button>
                        </Form>
                    </div>
                 ) : (
                    <div className="col-md-12">
                        {this.state.codeSent ? (
                            <div>
                                <h4> A Code has been sent to your email at {this.state.userEmail}</h4>
                                <Form>
                                    <FormGroup>
                                        {codeErrors}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Please input the code sent to you</Label>
                                        <Input
                                            type={`text`}
                                            name={`code`}
                                            onChange={this.handleCode}
                                            value={this.state.code.value}
                                            className={this.state.code.class}
                                            disabled={this.state.codeProcessing} />
                                        <Button onClick={this.checkCode} disabled={this.state.codeProcessing}>
                                            {this.state.codeProcessing ? 'Processing' : 'Submit Code'}
                                        </Button>
                                        {' '}
                                        <Button onClick={this.sendCode}> Resend Code </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        ) : (
                            <div>
                                <h4>In order to change your password you must request a verification code
                                    to be sent to your email at <span>{this.state.userEmail}</span>
                                </h4>
                                <h3>Would you like to proceed? </h3>
                                <Button onClick={this.sendCode} >Send Code</Button> {' '}
                                <Button onClick={this.goBack}>No</Button>
                            </div>
                        )}
                    </div>
                )}
                {this.state.passwordChanged &&
                    <div>
                        <h2>Your password has successfully been changed!</h2>
                    </div>
                }
            </div>
        );
    }
};


ChangePassword.propTypes = propTypes;

export default ChangePassword;
