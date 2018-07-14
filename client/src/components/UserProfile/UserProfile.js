import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Nav, NavItem} from 'reactstrap';
import {Link, Switch, Route} from 'react-router-dom';
import API from '../../utils/API';
import Account from './ProfileTabs/Account';
import GameTips from './ProfileTabs/GameTips';
import Contact from './ProfileTabs/Contact';
/**
 * Function the Returns Profile Bar on left with all user info
 * @param { object } props Object with Props Passed.
 * @return { Profile }
 */
function Profile({username, petname, status, accountLength, userFound}) {
        return (
            <div className='row'>
                <div className='col-sm-4 col-md-12'>
                    <div className='profile-pic'>
                        <div className='edit-pic'>
                            <p>Edit Pic</p>
                        </div>
                    </div>
                </div>
                <ProfileInfo userFound={userFound} info={username} tabname={'USERNAME'} />
                <ProfileInfo userFound={userFound} info={petname} tabname={'PETNAME'} />
                <ProfileInfo userFound={userFound} info={status} tabname={'STATUS'} />
                <ProfileInfo userFound={userFound} info={accountLength} tabname={'ACCOUNT LENGTH'} />
            </div>
        );
}
Profile.propTypes = {
    username: PropTypes.string.isRequired,
    petname: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    accountLength: PropTypes.string.isRequired,
    userFound: PropTypes.bool.isRequired,
};

/**
 * Function That Returns an Profile Info to Profile
 * @param { object } props
 * @return { ProfileInfo }
 */
function ProfileInfo({userFound, info, tabname}) {
    console.log(userFound);
    if (!userFound) {
        info = ' ';
    };
    return (
            <div className='col-sm-4 col-md-12 profile-info'>
                <h5 className='label'>{tabname}</h5>
                <h4 className='user-info'>{info}</h4>
            </div>
    );
};
ProfileInfo.propTypes = {
    userFound: PropTypes.bool.isRequired,
    info: PropTypes.string.isRequired,
    tabname: PropTypes.string.isRequired,
};
/**
 * Function That Returns Nav Items for Nav
 * @param { object } props
 * @return { ProfileNav }
 */
function ProfileNav({link, userFound, linkName}) {
    if (!userFound) {
        link = '/settings/nouser';
    };
    return (
            <NavItem className='userProfile-nav-item'>
                <Link to={link} className='userProfile-nav nav-link'>{linkName}</Link>
            </NavItem>
    );
}
ProfileNav.propTypes = {
    link: PropTypes.string.isRequired,
    userFound: PropTypes.bool.isRequired,
    linkName: PropTypes.string.isRequired,
};
/**
 * @class UserProfile
 */
class UserProfile extends Component {
    /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                balance: 0,
                mongo_id: 0,
                last_login: '',
                status: '',
                pet_name: '',
                pet_type: '',
                account_length: 0,
                emailVerified: false,
            },
            userIsLogginedIn: false,
            searchingForUser: true,
        };
    };
    /**
     * Function that runs once Component is mounted to retrieve
     * user from session storage and rerenders due to setState
     */
    componentDidMount() {
        this.getUser();
    };
    /**
     * Function that gets called to retrieve user from session storage and sets component's state
     */
    getUser() {
        API.getUserProfile()
            .then((res) => {
                console.log('UserProfile');
                console.log(res.data);
                const user = res.data.user;
                const {pet_type: petType, pet_name: petName} = res.data.pet;
                user.pet_type = petType;
                user.pet_name = petName;
                this.setState({
                    user: user,
                    searchingForUser: false,
                    userIsLogginedIn: true});
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
            <div className='container user-profile-main-container'>
                <div className='row'>
                    <div className='col-sm-12 col-md-3 profile-containers user-info'>
                            <Profile
                                userFound={this.state.userIsLogginedIn}
                                username={this.state.user.username}
                                petname={this.state.user.pet_name}
                                status={this.state.user.status}
                                accountLength={`${this.state.user.account_length} Days`} />
                    </div>
                    <div className='col-sm-12 col-md-7 profile-containers user-options'>
                        <div className='row'>
                                <Nav>
                                    <ProfileNav
                                        userFound={this.state.userIsLogginedIn}
                                        link={'/settings/account'}
                                        linkName={'Account'}/>
                                    <ProfileNav
                                        userFound={this.state.userIsLogginedIn}
                                        link={'/settings/Pet'}
                                        linkName={'Pet'}/>
                                    <ProfileNav
                                        userFound={this.state.userIsLogginedIn}
                                        link={'/settings/game'}
                                        linkName={'Game Tips'}/>
                                    <ProfileNav
                                        userFound={this.state.userIsLogginedIn}
                                        link={'/settings/contact'}
                                        linkName={'Contact Us'}/>
                                </Nav>
                            {this.state.userIsLogginedIn ? (
                                <Switch>
                                    <Route
                                        exact path="/settings/account"
                                        render={(props) => <Account {...props} user={this.state.user} />} />
                                    <Route
                                        exact path="/settings/game"
                                        render={(props) => <GameTips {...props} user={this.state.user} />} />
                                    <Route
                                        exact path="/settings/contact"
                                        render={(props) => <Contact {...props} user={this.state.user} />} />
                                </Switch>
                            ) : (
                                <div className='col-12'>
                                    <h4> You must be logged in to access these options, please log in. </h4>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;
