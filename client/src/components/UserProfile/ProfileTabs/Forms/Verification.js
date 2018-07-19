import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import API from '../../../../utils/API';
const propTypes = {
    email: PropTypes.string,
    verified: PropTypes.bool,
    goBack: PropTypes.func,
};
/**
 * @return {*} Container
 */
class Verification extends Component {
    /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            email: props.email,
            isVerified: props.verified,
            sentEmail: false,
        };

        this.sendEmailVerification = this.sendEmailVerification.bind(this);
        this.goBack = this.goBack.bind(this);
    };

    /**
     * Function so user can go back.
     */
    goBack() {
        this.props.goBack(' ');
    };

    /**
     * Function that sends email link
     */
    sendEmailVerification() {
        const host = window.location.host;
        const data = {
            host: host,
            current_email: this.state.email,
            emailToVerify: this.state.email,
        };
        API.requestEmailVerification(data)
            .then((res) => {
                console.log(res);
                this.setState({
                    sentEmail: true,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    /**
     * @return {*} Container
     */
    render() {
        return (
            <div className='account-form-container row'>
                <div className='col-md-12'>
                    <Button onClick={this.goBack}> Back </Button>
                    <h3>Your email {this.state.email} is
                    {this.state.isVerified ? 'verified'
                    : ' not verified. Please request a verification link to verify your email'}
                    </h3>
                    {(!this.state.isVerified && !this.state.sentEmail) && (
                        <Button onClick={this.sendEmailVerification}> Send Verification Link </Button>
                    )}
                    {this.state.sentEmail && (
                        <Button disabled> Verification link sent.</Button>
                    )}
                </div>
            </div>
        );
    }
}

Verification.propTypes = propTypes;

export default Verification;
