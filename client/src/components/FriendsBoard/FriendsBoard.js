import React, {Component} from 'react';
import {FriendRequest, FriendList, FriendSearch} from '../../components/FriendsBoard';
import {Card, CardText, CardBody, CardTitle, Navbar, Nav, NavItem, NavLink, Col, Row, Button, Container, Collapse} from "reactstrap";

export class FriendsBoard extends Component {


    constructor(props) {
        super(props);     
        this.handleButton1 = this.handleButton1.bind(this);  
        this.closeButton1 = this.closeButton1.bind(this);  
        this.state = { collapse: false, button1Value: false, button2Value: true, button3Value: false, };

      }
    

      handleButton1() {
        console.log(this.state.button1Value);  
        this.setState({button1Value: true});
        console.log(this.state.button1Value);
      }
      
      closeButton1() {
        console.log(this.state.button1Value);
        this.setState({button1Value: false});
        console.log(this.state.button1Value);
      }

   

render (){

    const button1Value = this.state.button1Value;
    const button2Value = this.state.button2Value;
    let button1;
    let button2;
    let button3;

    if (button1Value) {
      button1 = <FriendListButton onClick={this.closeButton1} />;
    } else {
      button1 = <FriendListButton onClick={this.handleButton1} />
    }



    return(
<Container>
    <Row>
    <Col sm="8" md={{ size: 11, offset: 0 }}>
            <Card color="light">
                <CardBody>
                    <CardTitle>Friends Board</CardTitle>
                        <Navbar color="light" light expand="md">
                            <Nav tabs>
                                <NavItem>
                                <div>
        
        {button1}

      </div>
                                </NavItem>
                                <NavItem>
                                    <div>
                                 {button2}  
                                </div>
                                </NavItem>
                                <NavItem>
                                
                                </NavItem>
                            </Nav>
                        </Navbar>
 
                            <div>
        <FriendsList button1Value={button1Value} />
      </div>
      <div>
       
          </div>
                </CardBody>
            </Card>
        </Col>
    </Row>
</Container>
)
}
};

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }

function FriendsList(props) {
    console.log('Friendslist');
    const button1Value = props.button1Value;
    if (button1Value) {
      return <FriendList/>;
    }
    return <GuestGreeting/>;
  }
  
  function FriendsRequest(props) {
    const button2Value = props.button2Value;
    if (button2Value) {
        console.log("this is working");
      return <FriendsRequest/>;
    }
    console.log('this is working greeting');
    return <GuestGreeting/>;
  }


  function FriendListButton(props) {
    return (
      <NavLink onClick={props.onClick}>
        Friends List
      </NavLink>
    );
  }




