import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import API from '../../utils/API';


function Profile(props){
    var {username, petname ,status, accountLength, userFound} = props;

    
        return(
            <div className='row'>
                <div className='col-sm-4 col-md-12'>                
                    <div className='profile-pic'>
                        <div className='edit-pic'>
                            <p>Edit Pic</p>
                        </div>
                    </div>
                </div>
                <ProfileInfo userfound={userFound} info={username} tabname={'USERNAME'} />
                <ProfileInfo userfound={userFound} info={petname} tabname={'PETNAME'} />
                <ProfileInfo userfound={userFound} info={status} tabname={'STATUS'} />
                <ProfileInfo userfound={userFound} info={accountLength} tabname={'ACCOUNT LENGTH'} />
            </div>
        )

};

function ProfileInfo(props){
    var { userFound, info, tabname } = props;
    if(!userFound){
        info = " ";
    };
    return(
            <div className='col-sm-4 col-md-12 profile-info'>
                <h5 className='label'>{tabname}</h5>
                <h4 className='user-info'>{info}</h4>
            </div>
    )
}
function ProfileNav(props){
    var { link , userFound, linkName } = props;

    if(!userFound){
        link = '/settings/nouser';
    };
    return(
            <NavItem className='userProfile-nav-item'>
                                
                <Link to={link} className='userProfile-nav nav-link'>{linkName}</Link>

            </NavItem>
    );
};


class UserProfile extends Component{
    constructor(props){
        super(props)

        this.state = {          
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            balance: 0,
            mongo_id: 0,
            last_login: "",
            status: "",
            pet_name:"",
            pet_type:"",
            account_length: 0,
            userIsLogginedIn: false,
            searchingForUser: true,
            emailVerified: false
        };
            
    }

    componentDidMount(){
        this.getUser();
    };

    getUser(){
        API.getUserProfile()
            .then(res => {
                console.log('UserProfile');
                console.log(res.data);
                const { 
                    firstname, 
                    lastname,
                    username, 
                    email, 
                    password, 
                    balance, 
                    mongo_id, 
                    last_login, 
                    status, 
                    account_length, 
                    emailVerified} = res.data.user;
                const { pet_type, pet_name } = res.data.pet;
                this.setState({
                    firstname: firstname,
                    lastname : lastname,
                    username : username,
                    email : email,
                    password: password, 
                    balance: balance,
                    mongo_id : mongo_id,
                    last_login: last_login, 
                    status: status, 
                    pet_name : pet_name, 
                    pet_type : pet_type, 
                    account_length: account_length, 
                    emailVerified: emailVerified,
                    searchingForUser: false,
                    userIsLogginedIn: true});

                

            }).catch(err => {

                    console.log(err);
                });
    };


    

    render(){
        const userFound = this.state.userIsLogginedIn;
        return(
            <div className='container user-profile-main-container '>
                <div className='row'>
                    <div className='col-sm-12 col-md-3 profile-containers user-info'>
                            <Profile 
                                userFound={userFound}
                                username={this.state.username}
                                petname={this.state.pet_name}
                                status={this.state.status}
                                accountLength={this.state.account_length} /> 

                    </div>
                
                    <div className='col-sm-12 col-md-7 profile-containers user-options'>
                        <div className='row'>
                           
                                <Nav>
                                    <ProfileNav userFound={userFound} link={'/settings/account'} linkName={'Account'}/>
                                    <ProfileNav userFound={userFound} link={'/settings/Pet'} linkName={'Pet'}/>
                                    <ProfileNav userFound={userFound} link={'/settings/game'} linkName={'Game Tips'}/>
                                    <ProfileNav userFound={userFound} link={'/settings/contact'} linkName={'Contact Us'}/>
                                </Nav>
                                
                           
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default UserProfile;