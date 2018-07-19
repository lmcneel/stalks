import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';

import mainLogo from './../../assets/images/smp-logo.svg';
import splashGif from './../../assets/images/SplashGIF.gif';

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
    constructor(props) {
        super(props);
        this.state = {
            showSignIn: true,
        };

        this.toggleSignup = this.toggleSignup.bind(this);
    };

    /**
     * Function that toggles signup/signin forms
     */
    toggleSignup() {
        this.setState({showSignIn: !this.state.showSignIn});
    };

    /**
     * Render function for App Component
     * @return {JSX}
     */
    render() {
        return (
            <Container fluid className='bg-success'>
                <Row className="text-center">
                    <Col>
                    <img src={splashGif} className="mx-auto d-block"/>
                    <img src={mainLogo} alt="Text Logo for Stock Market
         Pets in a pixel looking fontface, logo is white on green bg" className="mx-auto d-block col-8 mt-5 mb-3"/>
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
        );
    };
};

export default Splash;
