import React, {Component} from 'react';
import {Card, CardText, CardBody, CardTitle, Navbar, Nav, NavItem, NavLink, Col, Row, Button, Container, Collapse} from "reactstrap";

export class FriendsBoard extends Component {


    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }

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
                                <NavItem>
                                    <NavLink onClick={this.toggle} style={{ marginBottom: '1rem' }}>Friend List</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="">|   Friend Request   |</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="">Friend Search</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                        <div>
               <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
           LIST OF FRIENDS WILL GO HERE
            </CardBody>
          </Card>
        </Collapse>
      </div>
                </CardBody>
            </Card>
        </Col>
    </Row>
</Container>
    )
}
};
