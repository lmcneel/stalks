import React, {Component} from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
<<<<<<< HEAD
import PropTypes from 'prop-types';
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';
=======
import mainLogo from './../../assets/images/smp-logo.svg';
>>>>>>> 858d2d81d0a83d70a5493f24e306e7317107b13f

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

<<<<<<< HEAD
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
=======
const Splash = (props) => <Container className="bg-success">
>>>>>>> 858d2d81d0a83d70a5493f24e306e7317107b13f
    <Row className="text-center mt-5">
        <Col>
        <img src="http://placekitten.com/700/300" className="mx-auto d-block"/>
        <img src={mainLogo} alt="Text Logo for Stock Market
         Pets in a pixel looking fontface, logo is white on green bg" className="mx-auto d-block col-8 mt-5 mb-3"/>
        <p className="text-light description">Adopt a Stock Market Pet and learn the basics of the stock market.</p>
        </Col>
    </Row>
    <Row>
<<<<<<< HEAD
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
=======
        <Col>
            <Form className=" bg-light col-5 px-4 py-3 mx-auto border rounded">
                <FormGroup>
                <Label for="username">Username</Label>
                <Input type="username" name="username" id="userName" />
                </FormGroup>
                <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="userPassword" />
                </FormGroup>
                <Button className="col-12">Log-in</Button>
            </Form>
            </Col>
    </Row>

    <Row className="py-3">
>>>>>>> 858d2d81d0a83d70a5493f24e306e7317107b13f
        <Col>
        <div className="bg-light col-5 px-3 py-3 mx-auto border rounded text-center">
        <p className="mb-0">Get a Stock Market Pet Today <Button className="ml-3">Sign up</Button></p>
        </div>
        </Col>
    </Row> */}
    </Container>
        )
    }
}


export default Splash;
