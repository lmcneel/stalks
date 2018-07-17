import React, {Component} from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import PropTypes from 'prop-types';
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';

/**
 * Function the Returns Profile Bar on left with all user info
 * @param { object } props Object with Props Passed.
 * @return { Splash }
 */
class Splash extends Component {
     /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props){
        super(props);
        this.state = {
            showSignIn: true,
        };

        this.toggleSignup = this.toggleSignup.bind(this);
    };

    componentDidMount() {

        this.props.backgroundColor
    };
    toggleSignup() {
        console.log('heelo')
        this.setState({showSignIn: !this.state.showSignIn});
    }
    render() {
        return(
<Container className=''>
    <Row className="text-center mt-5">
        <Col>
        <img src="http://placekitten.com/700/300" className="mx-auto d-block"/>
        <h1 className="pt-5">Stock Market Pets</h1>
        <p>Adopt a Stock Market Pet and learn the basics of the stock market.</p>
        </Col>
    </Row>
    <Row>
        <Col className="bg-light">
            {this.state.showSignIn ? (
                <div>
                <Login />
                <Button onClick={this.toggleSignup}> Sign Up </Button>
                </div>
            ) : (
                <div>
                <SignUp />
                <Button onClick={this.toggleSignup}> Sign In </Button>
                </div>
            )}
        </Col>
    </Row>

    {/* <Row>
        <Col>
        <p>Get a Stock Market Pet Today</p>
        <Button>Sign up</Button>
        </Col>
    </Row> */}
    </Container>
        )
    }
}


export default Splash;
