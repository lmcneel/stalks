import React, {Component} from 'react';
import API from '../../utils/API';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFrown} from '@fortawesome/fontawesome-free-solid';
/**
* Sign out modal
*/
class SignoutForm extends Component {
    /**
     *@param {*} props
     */
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    };

    /**
     * Function to toggle modal upon mount
     */
    componentDidMount() {
        this.setState({modal: true});
    };
    /**
     * Function to toggle modal
     */
    toggle() {
        console.log(this.state.modal);
        if (this.state.modal) {
            this.props.history.push('/');
        };
        this.setState({modal: !this.state.modal});
    };

    /**
     * Function to log user out
     */
    logout() {
        API.logout().then((res) => {
            console.log(res);
            if (res.data === 'User has been logged out') {
                this.props.history.push('/');
                window.location.reload();
            } else {
                console.log(res);
            };
        }).catch((err) => {
            console.log(err);
        });
    }
    /**
     * Render function for App Component
     * @return {JSX}
     */
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                    Are you leaving your pets? <FontAwesomeIcon icon={faFrown} /></ModalHeader>
                    <ModalBody>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.logout}>Sorry Bye</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Ok I'll stay...</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };
};

SignoutForm.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
export default withRouter(SignoutForm);
