import React, { Component } from "react";
import API from "../../utils/API";
import { InputGroup, 
        InputGroupAddon, 
        Input,
        InputGroupButtonDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Button } from 'reactstrap';



class SignupForm extends Component {
    state={
        username:'',
        password:''
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
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
                    <InputGroupAddon addonType="prepend"><i class="fas fa-at"></i></InputGroupAddon>
                    <Input 
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name='username'
                        placeholder='Create a username' />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><i class="fas fa-key"></i></InputGroupAddon>
                    <Input 
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name='password'
                        placeholder='Create a password' />
                </InputGroup>
                <InputGroup>
                    <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                        <Button outline>Select a Pet</Button>
                        <DropdownToggle split outline />
                        <DropdownMenu>
                            <DropdownItem header>Pets</DropdownItem>
                            <DropdownItem>Pet 1</DropdownItem>
                            <DropdownItem>Pet 2</DropdownItem>
                            <DropdownItem>Pet 3</DropdownItem>
                            <DropdownItem>Pet 4</DropdownItem>
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input placeholder="and..." />
                    </InputGroup>

                <Button className='login-button'>Signup</Button>
            </div>
        );
    };
}

export default SignupForm;

