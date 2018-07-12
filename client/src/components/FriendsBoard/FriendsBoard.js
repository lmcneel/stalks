import React from "react";
import {Card, CardText, CardBody, CardTitle, Navbar, Nav, NavItem, NavLink, Col, Row, Button, Container} from "reactstrap";

export const FriendsBoard = (props) => {

return(
<Container>
    <Row>
    <Col sm="8" md={{ size: 11, offset: 0 }}>
            <Card height= '300px' color="light">
                <CardBody>
                    <CardTitle>Friends Board</CardTitle>
                        <Navbar color="light" light expand="md">
                            <Nav navbar>
                                <NavItem>
                                    <NavLink href="">Friend List</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="">|   Friend Request   |</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="">Friend Search</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar> 
                        <CardText>
                         
                        </CardText>   
                </CardBody>
            </Card>
        </Col>
    </Row>
</Container>
)
};
