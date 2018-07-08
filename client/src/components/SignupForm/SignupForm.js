import React, { Component } from "react";
import API from "../../utils/API";
import { 
    InputGroup, 
    InputGroupAddon, 
    Input,
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button 
    } from 'reactstrap';



class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleSplit = this.toggleSplit.bind(this);
        this.state = {
            dropdownOpen: false,
            splitButtonOpen: false,
            username:'',
            password:'',
            pet:''
        };
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleSplit() {
        this.setState({
            splitButtonOpen: !this.state.splitButtonOpen
        });
    }

    

    handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(`Name ${name}, Value ${value}`);
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        //if search was clicked
        console.log("login clicked");
        //TODO: add code to handle api route for signup
        API.signup(this.state.props);

    };

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><i className="fas fa-at"></i></InputGroupAddon>
                    <Input 
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name='username'
                        placeholder='Create a username' />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><i className="fas fa-key"></i></InputGroupAddon>
                    <Input 
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name='password'
                        placeholder='Create a password' />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                        <Button outline>Trading Pet</Button>
                        <DropdownToggle split outline >
                        </DropdownToggle>
                        <DropdownMenu 
                            name='pet'
                            >
                            <DropdownItem name='pet' value='wolf' onClick={this.handleInputChange}>Wolf</DropdownItem>
                            <DropdownItem name='pet' value='bear' onClick={this.handleInputChange}>Bear</DropdownItem>
                            <DropdownItem name='pet' value='ostrich' onClick={this.handleInputChange}>Ostrich</DropdownItem>
                            <DropdownItem name='pet' value='bull' onClick={this.handleInputChange}>Bull</DropdownItem>
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input 
                        placeholder="Select a Pet" 
                        value={this.state.pet} />
                </InputGroup>
                <br />
                <Button className='login-button'>Signup</Button>
            </div>
        );
    };
}

export default SignupForm;

