import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/fontawesome-free-solid';
import {Button} from 'reactstrap';

const propTypes = {
    option: PropTypes.string,
    togglePage: PropTypes.func,
    verified: PropTypes.bool,
};
/**
 * @return {*} Container
 */
class OptionLi extends Component {
        /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props) {
        super(props);
        let reqEmailVerified = true;
        switch (this.props.option) {
            case 'Change Email':
                reqEmailVerified = false;
                break;
            case 'Verification':
                reqEmailVerified = false;
                break;
            default:
                reqEmailVerified = true;
        };
        this.state = {
            reqEmailVerified: reqEmailVerified,
            optionName: props.option,
            isVerified: props.verified,
            clicked: false,
        };

        this.togglePage = this.togglePage.bind(this);
    }

    /**
     * Function that toggle the parent components page
     */
    togglePage() {
        this.props.togglePage(this.state.optionName);
    };
    /**
     * @return {*} Container
     */
    render() {
        return (
            <li className='col-md-12 account-option'>
                <div className='holder'>
                    <div className='option-body' onClick={this.togglePage}>
                        <Button size='md' className='icon-arrow-container'>
                            <FontAwesomeIcon size='1x' className='icon-arrow' icon={faChevronDown} />
                        </Button>
                        <span>{this.state.optionName}</span>
                    </div>
                    <hr className='userProfile-hr' />
                </div>
            </li>
        );
    }
}

OptionLi.propTypes = propTypes;
export default OptionLi;
