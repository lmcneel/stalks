import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OptionLi from './OptionLi';
import {ChangeEmail, ChangeUsername, ChangePassword, DeleteAcc} from './Forms';
const propTypes = {
    checkForm: PropTypes.func,
    user: PropTypes.object,
};
/**
 * @return {*} Container
 */
class Account extends Component {
  /**
   * Constructor function for setting state
   * @param {*} props
   */
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            showList: true,
            bodyShown: ' ',
        };

        this.toggleBody = this.toggleBody.bind(this);
    };
    /**
     * Function that toggles body
     * @param {string} body Uses string to deteremine which body to show
     */
    toggleBody(body) {
        console.log(body);
        this.setState({
            bodyShown: body,
            showList: !this.state.showList});
    };
    /**
     * @return {*} Container
     */
    render() {
        const user = this.props.user;
        console.log(user);
        return (
            <div className="row account-page-holder">
                <div className='col-md-12'>
                {this.state.showList ? (
                    <ul className='account-ul'>
                        <OptionLi
                            verified={user.emailVerified}
                            option={'Change Email'}
                            togglePage={() => this.toggleBody('Change Email')} />
                        <OptionLi
                            verified={user.emailVerified}
                            option={'Change Password'}
                            togglePage={() => this.toggleBody('Change Password')}/>
                        <OptionLi
                            verified={user.emailVerified}
                            option={'Change Username'}
                            togglePage={() => this.toggleBody('Change Username')}/>
                        <OptionLi
                            verified={user.emailVerified}
                            option={'Delete Account'}
                            togglePage={() => this.toggleBody('Delete Account')}/>
                    </ul>
                ) : (
                    <div>
                        {this.state.bodyShown === 'Change Email' &&
                            <ChangeEmail email={user.email} goBack={() => this.toggleBody(' ')}/>
                        }
                        {this.state.bodyShown === 'Change Password' &&
                            <ChangePassword email={user.email} goBack={() => this.toggleBody(' ')}/>
                        }
                        {this.state.bodyShown === 'Change Username' &&
                            <ChangeUsername email={user.email} goBack={() => this.toggleBody(' ')}/>
                        }
                        {this.state.bodyShown === 'Delete Account' &&
                            <DeleteAcc email={user.email} goBack={() => this.toggleBody(' ')}/>
                        }
                    </div>
                )}
                </div>
            </div>
        );
    }
}
Account.propTypes = propTypes;

export default Account;
