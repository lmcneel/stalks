import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import { Button } from 'reactstrap';

const propTypes = {
    option: PropTypes.string,
    togglePage: PropTypes.func,
    verified: PropTypes.bool
}
class OptionLi extends Component{
    constructor(props){
        super(props);
        this.state = {
            reqEmailVerified: true,
            optionName: "",
            isVerified: false,
            clicked: false
        }

        this.togglePage = this.togglePage.bind(this);
    }

    componentDidMount(){
        this.checkOption();
    };

    checkOption(){
        let reqEmailVerified = this.state.reqEmailVerified;
        let optionName = this.props.option;
        let isVerified = this.props.verified;
        switch(this.props.option){
            case 'Change Email':
                reqEmailVerified = false;
                break;
            case 'Verification':
                reqEmailVerified = false;
                break;
            default:
                reqEmailVerified = true;

        };

        this.setState({
            reqEmailVerified: reqEmailVerified,
            optionName: optionName,
            isVerified: isVerified
        });
    }


    togglePage(){
        this.props.togglePage(this.state.optionName);
    };
    render(){
        return(
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
        )
    }
}

OptionLi.propTypes = propTypes;
export default OptionLi;