import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Nav, NavItem} from 'reactstrap';
import {Link, Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import API from '../../utils/API';
import Account from './ProfileTabs/Account';
import GameTips from './ProfileTabs/GameTips';
import Contact from './ProfileTabs/Contact';
/**
 * Function the Returns Profile Bar on left with all user info
 * @param { object } props Object with Props Passed.
 * @return { Profile }
 */
function Profile({username, petname, status, accountLength}) {
        return (
            <div className='row'>
                <div className='col-sm-4 col-md-12'>
                    <div className='profile-pic'>
                        <div className='edit-pic'>
                            <p>Edit Pic</p>
                        </div>
                    </div>
                </div>
                <ProfileInfo info={username} tabname={'USERNAME'} />
                <ProfileInfo info={petname} tabname={'PETNAME'} />
                <ProfileInfo info={status} tabname={'STATUS'} />
                <ProfileInfo info={accountLength} tabname={'ACCOUNT LENGTH'} />
            </div>
        );
}
Profile.propTypes = {
    username: PropTypes.string.isRequired,
    petname: PropTypes.string,
    status: PropTypes.string.isRequired,
    accountLength: PropTypes.string.isRequired,
};

/**
 * Function That Returns an Profile Info to Profile
 * @param { object } props
 * @return { ProfileInfo }
 */
function ProfileInfo({info, tabname}) {
    return (
            <div className='col-sm-4 col-md-12 profile-info'>
                <h5 className='label'>{tabname}</h5>
                <h4 className='user-info'>{info}</h4>
            </div>
    );
};
ProfileInfo.propTypes = {
    info: PropTypes.string.isRequired,
    tabname: PropTypes.string.isRequired,
};
/**
 * Function That Returns Nav Items for Nav
 * @param { object } props
 * @return { ProfileNav }
 */
function ProfileNav({link, linkName}) {
    return (
            <NavItem className='userProfile-nav-item'>
                <Link to={link} className='userProfile-nav nav-link'>{linkName}</Link>
            </NavItem>
    );
}
ProfileNav.propTypes = {
    link: PropTypes.string.isRequired,
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
        console.log(props);
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
                petname: '',
                pettype: '',
                account_length: 0,
                emailVerified: false,
            },
            userLoggedIn: false,
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
                if (res.data === 'User not logged in') {
                    this.props.history.push('/login');
                } else {
                    const {
                        balance, Pet, createdAt, email, emailVerified,
                        firstname, id, last_login, lastname, mongo_id,
                        status, username} = res.data;
                    console.log(Pet);
                    console.log(`IDK what to do with this yet createdAt: ${createdAt}`);
                    const user = {
                        userId: id,
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        email: email,
                        balance: balance,
                        mongoID: mongo_id,
                        last_login: last_login,
                        status: status,
                        emailVerified: emailVerified,
                        pet_name: Pet.petName,
                        pet_type: Pet.petType,
                        pet_id: Pet.id,
                        account_length: 5,
                    };
                    this.setState({user: user,
                    userLoggedIn: true});
                };
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
                                username={this.state.user.username}
                                petname={this.state.user.pet_name}
                                status={this.state.user.status}
                                accountLength={`${this.state.user.account_length} Days`} />
                    </div>
                    <div className='col-sm-12 col-md-7 profile-containers user-options'>
                        <div className='row'>
                                <Nav>
                                    <ProfileNav
                                        link={'/settings/account'}
                                        linkName={'Account'}/>
                                    <ProfileNav
                                        link={'/settings/Pet'}
                                        linkName={'Pet'}/>
                                    <ProfileNav
                                        link={'/settings/game'}
                                        linkName={'Game Tips'}/>
                                    <ProfileNav
                                        link={'/settings/contact'}
                                        linkName={'Contact Us'}/>
                                </Nav>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
UserProfile.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(UserProfile);
