import React, {Component} from 'react';
import {FriendList, FriendRequest, FriendSearch} from '../../components/FriendsBoard';
import {Card, CardBody, CardTitle, Navbar, Nav, NavItem, Col, Row, Container} from "reactstrap";

// Main Component to nest all other Friends Components
export class FriendsBoard extends Component {

constructor(props) {
    super(props);         
    this.state = { nav1: false, nav2: false, nav3: false};
};
    
// Function to toggle this.state.nav1 for displaying FriendList component
toggleNav1 = () =>{
    this.setState({
        nav1: !this.state.nav1
    });
};

// Function to toggle this.state.nav2 for displaying FriendRequest component
toggleNav2 = () =>{
    this.setState({
        nav2: !this.state.nav2
    });
};

// Function to toggle this.state.nav3 for displaying FriendSearch component
toggleNav3 = () =>{
    this.setState({
        nav3: !this.state.nav3
    });
};

   

render (){

    return(

<Container>
    <Row>
        <Col sm="8" md={{ size: 11, offset: 0 }}>
                <Card color="light">
                
                    <CardBody>

                        <CardTitle>Friends Board</CardTitle>

                            <Navbar color="light" light expand="md">

                                <Nav tabs>

                                    {/* NavItem to toggle FriendList component for user */}
                                    <NavItem onClick={this.toggleNav1}>
                                        Friends List  
                                    </NavItem>

                                    {/* NavItem to toggle FriendRequest component for user */}
                                    <NavItem onClick={this.toggleNav2}>
                                        |    Friend Request   |
                                    </NavItem>

                                    {/* NavItem to toggle FriendSearch component for user */}
                                    <NavItem onClick= {this.toggleNav3}>
                                        Friend Search
                                    </NavItem>
                                    
                                </Nav>
                            
                            </Navbar>

                    </CardBody>

                </Card>

            {/* Functionality to render components  */}
            {this.state.nav1 && <div><FriendList/></div>}                      
            {this.state.nav2 && <div><FriendRequest/></div>}    
            {this.state.nav3 && <div><FriendSearch/></div>}     

        </Col>
    </Row>
</Container>
)
}
};
