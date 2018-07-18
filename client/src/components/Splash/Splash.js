import React, {Component} from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import PropTypes from 'prop-types';
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
     * @public componentDidMount function will render elements
     */
    componentDidMount() {
        this.props.backgroundColor
    };
    toggleSignup() {
        console.log('heelo')
        this.setState({showSignIn: !this.state.showSignIn});
    }
    render() {
        return(
            <Container fluid className='bg-success'>
                <Row className="text-center">
                    <Col>
                    <img src={splashGif} className="mx-auto d-block"/>
                    <img src={mainLogo} alt="Text Logo for Stock Market
                    Pets in a pixel looking fontface, logo is white on green bg" className="mx-auto d-block col-8 mt-5 mb-3"/>
                    <p className="text-light description">Adopt a Stock Market Pet and learn the basics of the stock market.</p>
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

            </Container>
        )
    }
}


export default Splash;
